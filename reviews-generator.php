<?php
/**
 * Created by PhpStorm.
 * User: Robery
 * Date: 4/9/2017
 * Time: 1:06 AM
 */

$DB = new MySQLi("localhost", "root", "parola", "consulting");

$sql = "
        SELECT *
        FROM `consultants_clients`
";
$consultants = $DB->query($sql)->fetch_all(MYSQLI_ASSOC);

foreach ($consultants as $client) {
    $score = rand(1,5);

    if ($client['review_sent'] == 1) {
        file_put_contents("clients.sql", "INSERT INTO `clients_reviews` (`client_id`, `score`)
                  VALUES ('{$client['client_id']}', '$score');\n", FILE_APPEND | LOCK_EX);
    }
}
