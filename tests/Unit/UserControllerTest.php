<?php

namespace Tests;

require __DIR__.'/../../app/Http/Controllers/AuthController.php';

use PHPUnit\Framework\TestCase;

class AuthControllerTest extends TestCase
{
    /** 
     * @test 
     */
    public function create()
    {
        $password = '123';
        $password_confirm = '123';
        $this->assertSame($password,$password_confirm);

    }
}
