<?php

namespace Vetstoria\OnTrack\Admin\Controllers;

use Phalcon\Mvc\Controller;

class LoginController extends Controller
//class LoginController extends \Vetstoria\OnTrack\Controllers\TemplateController
{
    public function indexAction()
    {
        var_dump(__FUNCTION__); exit;

        $this->setResourceId( Authenticator::getAccountId() );
        
        $this->setVar( "locale", Authenticator::getLocale() );
        $this->setVar( "version", VERSION );
        $this->setVar( 'app_init_time', DEBUG_MODE ? '.'.APP_INIT_TIME : null );

        //parent

        //include __DIR__."/../../../../public/ui/index.php" ;

    }

    public function loginAction(){
        var_dump(__FUNCTION__); exit;
    }
}
