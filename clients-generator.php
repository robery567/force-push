<?php
/**
 * Created by PhpStorm.
 * User: Robery
 * Date: 4/8/2017
 * Time: 10:35 PM
 */
$DB = new MySQLi("localhost", "root", "parola", "consulting");

$sql = "
        SELECT *
        FROM `consultants`
";
$consultants = $DB->query($sql)->fetch_all(MYSQLI_ASSOC);

foreach ($consultants as $consultantData) {
    $clientsNumber = rand(0, 100);

    if ($clientsNumber == 0) {
        continue;
    }

    for ($counterClients = 1; $counterClients <= $clientsNumber; $counterClients++) {
        $lastName = ["Burghele", "Butnariu", "Buzoianu", "Căciulescu", "Cacoveanu", "Cadanțu", "Căileanu", "Calimente", "Captaru", "Caracostea", "Carafoli", "Caramitru", "Carianopol", "Câșle", "Cassian", "Cățoiu", "Căuș", "Cămătaru", "Cehanu", "Ceia", "Celibidache", "Cenușaru", "Cerăceanu", "Cesereanu", "Chelariu", "Chendi", "Chintezanu", "Chioreanu", "Chirtoacă", "Cimpoeșu", "Cîndea", "Ciorogariu", "Cioroianu", "Ciucurescu", "Ciulei", "Ciupercovici", "Cleopa", "Colceru", "Colibășanu", "Colțoiu", "Comarnescu", "Combiescu", "Corduneanu", "Corfanta", "Corodeanu", "Coropcean", "Corut", "Cotescu", "Covacevici", "Covătaru", "Cozacovici", "Craiu", "Crisbășan", "Crăiniceanu", "Cusin", "Cîmpineanu", "Dănceanu", "Dănciulescu", "Densușianu", "Derdena", "Diculescu", "Dinculeanu", "Dinică", "Diță", "Dobran", "Dobrincu", "Dobrogianu", "Dogărescu", "Dogariu", "Doinaș", "Donțul", "Dorobanțu", "Draghincescu", "Dragomirescu", "Drăgușeanu", "Drugănescu", "Dumbrăveanu", "Dzițac", "Edeleanu", "Fernic", "Finiti", "Fiscuteanu", "Foarță", "Focșăneanu", "Focșanu", "Focșineanu", "Frunda", "Fugaru", "Găitan", "Gălățanu", "Galeriu", "Găvănescu", "Geiculescu", "Gheorghelaș", "Gheorghilaș", "Gherghescu", "Ghideanu", "Ghizari", "Gingăraș", "Giosanu", "Gojnea", "Gondi", "Gozsdu", "Gritti", "Grosescu", "Grozescu", "Guci", "Guțiu", "Gănescu", "Hermeneanu", "Hertza", "Hetco", "Hirțea", "Honcescu", "Hrușcă", "Hurezeanu", "Hurmuzescu", "Iaru", "Ioviț", "Ivănceanu", "Ivasiuc", "Jumanca", "Kiazim", "Lincar", "Lipă", "Livescu", "Loteanu", "Lubanovici", "Lugojanu", "Lupea", "Lupuțiu", "Magieru", "Mălăncioiu", "Maluțan", "Manciulea", "Manoilă", "Manțog", "Mărăcuță", "Mărășescu", "Mărginean", "Marioțeanu", "Mânea", "Miclescu", "Mocănescu", "Modorcea", "Murafa", "Mureșean", "Mureșian", "Murnu", "Nădășan", "Negoițescu", "Neniță", "Notara", "Oeriu", "Ogăraru", "Olinescu", "Orașan", "Orășan", "Orășean", "Orășeanu", "Ornea", "Oroveanu", "Pacepa", "Pâclișan", "Pâclișanu", "Pădurariu", "Paduretu", "Pangrati", "Papacioc", "Parascan", "Parizescu", "Pascali", "Pascaly", "Pătruț", "Pîrvu", "Pîslaru", "Pitulea", "Pleșan", "Ploeșteanu", "Podoleanu", "Poghirc", "Pogoneanu", "Pogor", "Poienaru", "Pomuț", "Poroineanu", "Posteucă", "Procopovici", "Puşcaşu", "Păturică", "Răducioiu", "Rebengiuc", "Ressu", "Rîpă", "Rîpeanu", "Rușanu", "Săchelariu", "Săchelaru", "Săhleanu", "Șăineanu", "Sărățeanu", "Sârghie", "Sassu", "Sătmărean", "Șcurea", "Șelmaru", "Șchiopul", "Șerbănoiu", "Șerbulescu", "Seulescu", "Șirato", "Sirețeanu", "Spădaru", "Spineanu", "Spircu", "Stamatu", "Sturza", "Talianu", "Tatomirescu", "Teleanu", "Țenescu", "Teodorașcu", "Țermure", "Tighineanu", "Țîrle", "Todiraș", "Toduță", "Tomița", "Tomoiagă", "Tuducan", "Țulea", "Turcescu", "Turcuman", "Turdeanu", "Țuțea", "Uglar", "Ungheanu", "Urziceanu", "Vădineanu", "Văleanu", "Vanghelie", "Varo", "Vatamanu", "Vellescu", "Vicoveanca", "Videanu", "Vîlcu", "Vindereu", "Vințan", "Vioreanu", "Vladu", "Vlădărău", "Vraca", "Zavati", "Zăvoranu", "Zbenghea", "Zegrean", "Zgondea", "Zorlescu"];
        $firstName = ["Marcel", "Ionut", "Ionel", "Vasilica", "Loredana", "Alexandra", "Alexandru", "Petronela", "Cristina", "Cristian", "Robert", "Denis", "George", "Gheorghe", "Mircea", "Traian", "Victor", "Victoria", "Marcela", "Ionela", "Laurentia", "Laura", "Dominica", "Diana", "Larisa", "Daniel", "Gabriela", "Florin", "Florentin", "Florentina", "Daria", "Coralia", "Raul", "Darius", "Maria", "Tatiana", "Titian"];

        $clientName = $lastName[rand(0, count($lastName) - 1)] . " " . $firstName[rand(0, count($firstName) - 1)];

        $reviewSent = rand(0, 1);
        file_put_contents("clients.sql", "INSERT INTO `consultants_clients` (`parent_id`, `client_name`, `review_sent`) 
                            VALUES ('{$consultantData['id']}', '{$clientName}', $reviewSent);\n", FILE_APPEND | LOCK_EX);

//        $client = $DB->query("SELECT *
//                                        FROM `consultants_clients`
//                                        WHERE
//                                        `parent_id` = '{$consultantData['id']}'
//                                        AND `client_name` = '{$clientName}'")->fetch_array(MYSQLI_ASSOC);
//        $score = rand(1, 5);
//        $DB->query("INSERT INTO `clients_reviews` (`client_id`, `score`)
//                  VALUES ('{$client['client_id']}', '$score')");

    }
}