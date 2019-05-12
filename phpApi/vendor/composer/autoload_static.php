<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit81ce89770e47e5607208a351583ea5b2
{
    public static $prefixLengthsPsr4 = array (
        'Y' => 
        array (
            'Youshido\\GraphQL\\' => 17,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Youshido\\GraphQL\\' => 
        array (
            0 => __DIR__ . '/..' . '/youshido/graphql/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit81ce89770e47e5607208a351583ea5b2::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit81ce89770e47e5607208a351583ea5b2::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
