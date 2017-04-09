<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

//Request::setTrustedProxies(array('127.0.0.1'));

$app->get('/', function () use ($app) {
    $data = [
        "message" => "welcome"
    ];

    return $app->json($data);
})
    ->bind('homepage');

$app->get('/get/specializations', function () use ($app) {
    $sql = "SELECT * FROM `specializations` ORDER BY `name` ASC";
    $data = $app['db']->fetchAll($sql);

    return $app->json($data);
})->bind('get_specializations');

$app->get('/get/counties', function () use ($app) {
    $sql = "SELECT * FROM `counties` ORDER BY `name` ASC";
    $data = $app['db']->fetchAll($sql);

    return $app->json($data);
})->bind('get_counties');

$app->get('/get/consultants', function (Request $request) use ($app) {
    $sql = "SELECT 
              `c`.`id` AS `id`,
              `c`.`name` AS `name`,
              `c`.`legitimation` AS `legitimation`,
              `c`.`telephone`
              FROM `consultants` `c`
              JOIN `consultants_specializations` `cs`
                ON `cs`.`parent_id` = `c`.`id`
              JOIN `specializations` `s`
                ON `s`.`id` = `cs`.`specialization_id`
              JOIN `consultants_county` `cc`
                ON `cc`.`parent_id` = `c`.`id`
              JOIN `counties`
                ON `counties`.`id` = `cc`.`county`
              WHERE 1
            ";

    $specialization = (int)$request->query->get('specialization');
    $county = (int)$request->query->get('county');
    $offset = (int)$request->query->get('start');
    $count = (int)$request->query->get('count');
    $orderBy = $request->query->get('order_by_score');

    $sqlParameters = array();
    if (!empty($specialization)) {
        $sql .= " AND `cs`.`specialization_id` = ?";
        array_push($sqlParameters, $specialization);
    }

    if (!empty($county)) {
        $sql .= " AND `cc`.`county` = ?";
        array_push($sqlParameters, $county);
    }

    $sql .= " GROUP BY `c`.`id`";

    if ($offset >= 0 && !empty($count)) {
        $sql .= " LIMIT {$offset}, {$count}";
    }

    $data = $app['db']->fetchAll($sql, $sqlParameters);

    foreach ($data as $consultandId => $consultantData) {
        $sql = "SELECT 
                        `c`.`id` AS `id`,
                        `c`.`name` AS `name` 
                        FROM consultants_county `cc`
                        JOIN `counties` `c`
                          ON `c`.`id` = `cc`.`county`
                        WHERE `cc`.`parent_id` = ?";

        $data[$consultandId]['counties'] = $app['db']->fetchAll($sql, array((int)$consultantData['id']));

        $sql = "SELECT 
                        `s`.`id` AS `id`,
                        `s`.`name` AS `name` 
                        FROM `consultants_specializations` `cs`
                        JOIN `specializations` `s`
                          ON `s`.`id` = `cs`.`specialization_id`
                        WHERE `cs`.`parent_id` = ?";

        $data[$consultandId]['specializations'] = $app['db']->fetchAll($sql, array((int)$consultantData['id']));

        $sql = "SELECT
                       `name`,
                       `latitude`,
                       `longitude`
                  FROM `cities`
                  WHERE `county_id` = ?
                  AND `county_seat` = 1";

        $data[$consultandId]['city'] = $app['db']->fetchAll($sql, array((int)$data[$consultandId]['counties'][0]['id']));

        if (!empty($orderBy)) {
            $sql = "SELECT 
                    `cc`.`parent_id` AS `parent_id`,
                    AVG(`cr`.`score`) AS `score`
                    FROM `consultants_clients` `cc`
                    JOIN `clients_reviews` `cr`
                      ON `cr`.`client_id` = `cc`.`client_id`
                    WHERE 
                          `cc`.`review_sent` = 1
                      AND `cc`.`parent_id` = '{$consultantData['id']}'";

            $fetchedData = $app['db']->fetchAssoc($sql);
            $data[$consultandId]['score'] = $fetchedData['score'];
        }
    }

    if (!empty($orderBy)) {
        if (strtolower($orderBy) == "asc") {
            usort($data, function ($a, $b) {
                return $a['score'] <=> $b['score'];
            });
        } else if (strtolower($orderBy) == "desc") {
            usort($data, function ($a, $b) {
                if ($a['score'] == $b['score']) {
                    return 0;
                }

                return $a['score'] < $b['score'] ? 1 : -1;
            });
        }
    }

    return $app->json($data);
})->bind('get_consultants');

$app->get('/search/name', function (Request $request) use ($app) {
    $name = $request->query->get('name');
    $offset = (int)$request->query->get('start');
    $count = (int)$request->query->get('count');

    $sql = "SELECT 
              `c`.`id` AS `id`,
              `c`.`name` AS `name`,
              `c`.`legitimation` AS `legitimation`,
              `c`.`telephone`
              FROM `consultants` `c`
              JOIN `consultants_specializations` `cs`
                ON `cs`.`parent_id` = `c`.`id`
              JOIN `specializations` `s`
                ON `s`.`id` = `cs`.`specialization_id`
              JOIN `consultants_county` `cc`
                ON `cc`.`parent_id` = `c`.`id`
              JOIN `counties`
                ON `counties`.`id` = `cc`.`county`
              WHERE `c`.`name` LIKE '%$name%'
              GROUP BY `c`.`id`
            ";

    if ($offset >= 0 && !empty($count)) {
        $sql .= " LIMIT {$offset}, {$count}";
    }

    $data = $app['db']->fetchAll($sql);

    foreach ($data as $consultandId => $consultantData) {
        $sql = "SELECT 
                        `c`.`id` AS `id`,
                        `c`.`name` AS `name` 
                        FROM consultants_county `cc`
                        JOIN `counties` `c`
                          ON `c`.`id` = `cc`.`county`
                        WHERE `cc`.`parent_id` = ?";

        $data[$consultandId]['counties'] = $app['db']->fetchAll($sql, array((int)$consultantData['id']));

        $sql = "SELECT 
                        `s`.`id` AS `id`,
                        `s`.`name` AS `name` 
                        FROM `consultants_specializations` `cs`
                        JOIN `specializations` `s`
                          ON `s`.`id` = `cs`.`specialization_id`
                        WHERE `cs`.`parent_id` = ?";

        $data[$consultandId]['specializations'] = $app['db']->fetchAll($sql, array((int)$consultantData['id']));

        $sql = "SELECT
                       `name`,
                       `latitude`,
                       `longitude`
                  FROM `cities`
                  WHERE `county_id` = ?
                  AND `county_seat` = 1";

        $data[$consultandId]['city'] = $app['db']->fetchAll($sql, array((int)$data[$consultandId]['counties'][0]['id']));
    }

    return $app->json($data);
})->bind('searchByName');

$app->get('/get/reviews', function (Request $request) use ($app) {
    $sql = "SELECT 
                    `cc`.`parent_id` AS `parent_id`,
                    `cc`.`client_id` AS `client_id`,
                    `cc`.`client_name` AS `client_name`,
                    `cr`.`score` AS `score`,
                    `cr`.`date_added` AS `date_added`
                    FROM `consultants_clients` `cc`
                    JOIN `clients_reviews` `cr`
                      ON `cr`.`client_id` = `cc`.`client_id`
                    WHERE 
                          `cc`.`review_sent` = 1
                      AND `cc`.`parent_id` = ?";

    $consultantId = $request->query->get('id');
    $data = $app['db']->fetchAll($sql, array((int)$consultantId));

    return $app->json($data);
})->bind('get_reviews');

$app->get('/get/reviews_average', function (Request $request) use ($app) {
    $sql = "SELECT 
                    `cc`.`parent_id` AS `parent_id`,
                    AVG(`cr`.`score`) AS `score`
                    FROM `consultants_clients` `cc`
                    JOIN `clients_reviews` `cr`
                      ON `cr`.`client_id` = `cc`.`client_id`
                    WHERE 
                          `cc`.`review_sent` = 1
                      AND `cc`.`parent_id` = ?";

    $consultantId = $request->query->get('id');
    $data = $app['db']->fetchAll($sql, array((int)$consultantId));

    return $app->json($data);
})->bind('getReviewsAverage');

$app->get('/get/clients', function (Request $request) use ($app) {
    $sql = "SELECT 
                    `cc`.`client_id` AS `client_id`,
                    `cc`.`client_name` AS `client_name`,
                    `cc`.`date_added` AS `date_added`
                    FROM `consultants_clients` `cc`
                    JOIN `clients_reviews` `cr`
                      ON `cr`.`client_id` = `cc`.`client_id`
                    WHERE 
                      `cc`.`parent_id` = ?";

    $consultantId = $request->query->get('id');
    $data = $app['db']->fetchAll($sql, array((int)$consultantId));

    return $app->json($data);
})->bind('getClients');

$app->after(function (Request $request, Response $response) {
    $response->headers->set('Access-Control-Allow-Origin', '*');
});

$app->error(function (\Exception $e, Request $request, $code) use ($app) {
    if ($app['debug']) {
        return;
    }

    // 404.html, or 40x.html, or 4xx.html, or error.html
    $templates = array(
        'errors/' . $code . '.html.twig',
        'errors/' . substr($code, 0, 2) . 'x.html.twig',
        'errors/' . substr($code, 0, 1) . 'xx.html.twig',
        'errors/default.html.twig',
    );

    return new Response($app['twig']->resolveTemplate($templates)->render(array('code' => $code)), $code);
});
