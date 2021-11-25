<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Doctor;
use App\Models\DoctorPhotos;
use App\Models\DoctorServices;
use App\Models\DoctorTestimonials;
use App\Models\doctorAvailability;

class DoctorController extends Controller
{

    private $loggedUser;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->loggedUser = auth()->user();
    }

    /*public function createRandom()
    {

        $array = ['error' => ''];

        for ($q = 0; $q < 15; $q++) {
            $names = ['Andressa', 'Augusto', 'Miguel', 'João', 'Teresa', 'Vanessa', 'Guilherme', 'Luiz', 'Letícia', 'Ernesto', 'Helena', 'Manoela', 'Artur'];
            $lastnames = ['Porfírio', 'Cruz', 'Santos', 'Silva', 'Oliveira', 'Freitas', 'Erdman'];

            $servicos = ['Clínica Geral', 'Endocrinologia', 'Ginecologia', 'Urologia', 'Psiquiatria', 'Psicologia', 'Dermatologia', 'Oftalmologia', 'Geriatria', 'Otorrinolaringologia', 'Pediatria', 'Ortopedia', 'Fisioterapia', 'Cardiologia', 'Neurologia', 'Nutrologia'];

            $depos = [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper lectus eu.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis massa mauris.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis massa mauris.',
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            ];

            $newDoctor = new Doctor();
            $newDoctor->name = $names[rand(0, count($names) - 1)].' '.$lastnames[rand(0, count($lastnames) - 1)];
            $newDoctor->avatar = rand(1, 4).'.png';
            $newDoctor->stars = rand(2, 4).'.'.rand(0 ,9);
            $newDoctor->latitude = '-23.5'.rand(0, 9).'30907';
            $newDoctor->longitude = '-46.6'.rand(0, 9).'82795';
            $newDoctor->save();

            $ns = rand(3, 6);

            for($w=0; $w<4; $w++) {
                $newDoctorPhoto = new DoctorPhotos();
                $newDoctorPhoto->id_doctor = $newDoctor->id;
                $newDoctorPhoto->url = rand(1, 5).'.png';
                $newDoctorPhoto->save();
            }

            for($w=0; $w<$ns; $w++) {
                $newDoctorService = new DoctorServices();
                $newDoctorService->id_doctor = $newDoctor->id;
                $newDoctorService->name = $servicos[rand(0, count($servicos)-1)];
                $newDoctorService->price = rand(100, 200);
                $newDoctorService->save();
            }

            for($w=0; $w<3; $w++) {
                $newDoctorTestimonial = new DoctorTestimonials();
                $newDoctorTestimonial->id_doctor = $newDoctor->id;
                $newDoctorTestimonial->name = $names[rand(0, count($names) - 1)];
                $newDoctorTestimonial->rate = rand(2, 4).'.'.rand(0, 9);
                $newDoctorTestimonial->body = $depos[rand(0, count($depos)-1)];
                $newDoctorTestimonial->save();
            }

            for($e=0; $e<4; $e++) {
                $rAdd = rand(7, 10);
                $hours = [];
                for($r=0; $r<8; $r++) {
                    $time = $r + $rAdd;if($time < 10) {
                        $time = '0'.$time;
                    }
                    $hours[] = $time.':00';
                }
                $newDoctorAvail = new DoctorAvailability();
                $newDoctorAvail->id_doctor = $newDoctor->id;
                $newDoctorAvail->weekday = $e;
                $newDoctorAvail->hours = implode(',', $hours);
                $newDoctorAvail->save();
            }
        }
        return $array;
    }*/

    public function list(Request $request) {
        $array = ['error' =>''];

        $doctors = Doctor::all();

        foreach($doctors as $bkey => $bvalue) {
            $doctors[$bkey]['avatar'] = url('media/avatars/'.$doctors[$bkey]['avatar']);
        }

        $array['data'] = $doctors;
        $array['loc'] = 'São Paulo';

        return $array;
    }
}
