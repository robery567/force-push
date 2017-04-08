<?php
exec('sudo git fetch --all && git reset --hard origin/master 2>&1', $out);
var_dump($out);
echo $out.PHP_EOL;
echo 'S-a rulat procesul de deploy!';