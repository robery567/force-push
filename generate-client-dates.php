<?php
/**
 * Created by PhpStorm.
 * User: Robery
 * Date: 4/9/2017
 * Time: 3:35 AM
 */

$DB = new MySQLi("localhost", "root", "parola", "consulting");

$sql = "
        SELECT `client_id`
        FROM `consultants_clients`
";
$consultants = $DB->query($sql)->fetch_all(MYSQLI_ASSOC);

foreach ($consultants as $client) {
    $year = rand(2015, 2017);
    $month = rand(1, 12);

    if ($month < 10) {
        $month = "0" . $month;
    }

    $day = rand(1, 28);

    if ($day < 10) {
        $day = "0" . $day;
    }

    $dateToInsert = $year . "-" . $month . "-" . $day;
    $dateToInsert = strtotime($dateToInsert);

    file_put_contents("clients-dates.sql", "UPDATE `consultants_clients` SET `date_added` = '{$dateToInsert}' WHERE `client_id` = '{$client['client_id']}';\n", FILE_APPEND | LOCK_EX);

}