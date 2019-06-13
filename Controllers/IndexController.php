<?php

namespace Vetstoria\OnTrack\Admin\Controllers;

use Phalcon\Mvc\Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        //var_dump(__CLASS__,__FUNCTION__); exit;

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

    public function loginAction(){
        var_dump(__FUNCTION__); exit;
    }
}
