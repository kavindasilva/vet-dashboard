<?php

namespace Vetstoria\OnTrack\Frontend\Controllers;

use Phalcon\Mvc\Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        //echo "Frontend index 1";
        //header("Location: ../../../ui"); // working in public folder

        //include "../../../ui/index.php" ;
        //include __DIR__."/../../../public/ui/index.php" ;
        include __DIR__."/../../../../public/ui/index.php" ;

        /*foreach (glob(__DIR__."/../../../public/ui/*") as $filename)
        {
            include $filename;
        }*/

    }
}
