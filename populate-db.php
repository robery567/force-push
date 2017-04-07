<?php
/**
 * Created by PhpStorm.
 * User: Robery
 * Date: 4/7/2017
 * Time: 9:59 PM
 */
$row = 1;
if (($handle = fopen("data.csv", "r")) !== FALSE) {
    $parsedData = array();
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);

        $parsedData[$row] = $data;

        $row++;
    }
    //$parsedData = json_encode($parsedData);
    fclose($handle);

    $DB = new MySQLi("188.166.165.16", "root", "macac123", "consulting");

    $isFirstLoop = true;
//    $counter = 0;
    try {
        $DB->begin_transaction();
        foreach ($parsedData as $data) {
//            if ($counter == 9) {
//                break;
//            }
            if ($isFirstLoop === true) {
                $isFirstLoop = false;
                continue;
            } else {
                // data[1] - county , data[4] - specialization
                $DB->query("INSERT INTO `consultants` 
                                        (`name`, `legitimation`, `telephone`)
                                VALUES  ('{$data[0]}', '{$data[2]}', '{$data[3]}')
                                        ");
                $parent = $DB->query("SELECT MAX(`id`) AS id FROM `consultants`")->fetch_array(MYSQLI_ASSOC);

                $checkData = $DB->query("SELECT *
                                                    FROM `counties` 
                                                    WHERE `name` = '{$data[1]}'");
                if ($checkData->num_rows) {
                    $countyData = $checkData->fetch_array(MYSQLI_ASSOC);

                    $DB->query("INSERT INTO `consultants_county` (`parent_id`, `county`) VALUES ('{$parent['id']}', '{$countyData['id']}')");
                } else {
                    $DB->query("INSERT INTO `counties` (`name`) VALUES ('{$data[1]}')");

                    $fetchData = $DB->query("SELECT *
                                                    FROM `counties` 
                                                    WHERE `name` = '{$data[1]}'")->fetch_array(MYSQLI_ASSOC);

                    $DB->query("INSERT INTO `consultants_county` (`parent_id`, `county`) VALUES ('{$parent['id']}', '{$fetchData['id']}')");
                }

                $specialization = explode(", ", $data[4]);
                foreach ($specialization as $specializationData) {
                    $checkData = $DB->query("SELECT *
                                                    FROM `specializations` 
                                                    WHERE `name` = '{$specializationData}'");

                    if ($checkData->num_rows) {
                        $specializationData = $checkData->fetch_array(MYSQLI_ASSOC);

                        $DB->query("INSERT INTO `consultants_specializations` (`parent_id`, `specialization_id`) VALUES ('{$parent['id']}', '{$specializationData['id']}')");
                    } else {
                        $DB->query("INSERT INTO `specializations` (`name`) VALUES ('{$specializationData}')");

                        $fetchData = $DB->query("SELECT *
                                                    FROM `specializations` 
                                                    WHERE `name` = '{$specializationData}'")->fetch_array(MYSQLI_ASSOC);

                        $DB->query("INSERT INTO `consultants_specializations` (`parent_id`, `specialization_id`) VALUES ('{$parent['id']}', '{$fetchData['id']}')");
                    }
                }

            }
            //$counter++;
        }
        $DB->commit();
    } catch (Exception $e) {
        $DB->rollback();
    }
}
