<?php

namespace Multiple\Frontend\Controllers;

use Phalcon\Mvc\Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        echo "Frontend index 1";
        //header("Location: ../../../ui"); // working in public folder

        //include "../../../ui/index.php" ;
        include __DIR__."/../../../public/ui/index.php" ;

    }
}
