<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\UserAppointment;
use App\Models\UserFavorite;
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

    private function searchGeo($address)
    {
        $key = env('MAPS_KEY', null);

        $address = urlencode($address);

        $url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . $address . '&key=' . $key;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $res = curl_exec($ch);
        curl_close($ch);

        return json_decode($res, true);
    }

    public function list(Request $request)
    {
        $array = ['error' => ''];

        $lat = $request->input('lat');
        $lng = $request->input('lng');
        $city = $request->input('city');
        $offset = $request->input('offset');
        if (!$offset) {
            $offset = 0;
        }

        if (!empty($city)) {
            $res = $this->searchGeo($city);

            if (count($res['results']) > 0) {
                $lat = $res['results'][0]['geometry']['location']['lat'];
                $lng = $res['results'][0]['geometry']['location']['lng'];
            }
        } elseif (!empty($lat) && !empty($lng)) {
            $res = $this->searchGeo($lat . ',' . $lng);

            if (count($res['results']) > 0) {
                $city = $res['results'][0]['formatted_address'];
            }
        } else {
            $lat = '-23.5630907';
            $lng = '-46.6682795';
            $city = 'São Paulo';
        }


        $doctors = Doctor::select(Doctor::raw('*, SQRT(
            POW(69.1 * (latitude - ' . $lat . '), 2) +
            POW(69.1 * (' . $lng . ' - longitude) * COS(latitude / 57.3), 2)) AS distance'))
            ->havingRaw('distance < ?', [15])
            ->orderBy('distance', 'ASC')
            ->offset($offset)
            ->limit(5)
            ->get();

        foreach ($doctors as $bkey => $bvalue) {
            $doctors[$bkey]['avatar'] = url('media/avatars/' . $doctors[$bkey]['avatar']);
        }

        $array['data'] = $doctors;
        $array['loc'] = 'São Paulo';

        return $array;
    }

    public function one($id)
    {
        $array = ['error' => ''];

        $doctor = Doctor::find($id);

        if ($doctor) {
            $doctor['avatar'] = url('media/avatars/' . $doctor['avatar']);
            $doctor['favorited'] = false;
            $doctor['photos'] = [];
            $doctor['services'] = [];
            $doctor['testimonials'] = [];
            $doctor['available'] = [];

            // Verificando FAVORITO
            $cFavorite = UserFavorite::where('id_user', $this->loggedUser->id)
                ->where('id_doctor', $doctor->id)
                ->count();
            if ($cFavorite > 0) {
                $doctor['Favorited'] = true;
            }

            // Pegando as fotos do Médico
            $doctor['photos'] = DoctorPhotos::select('id', 'url')->where('id_doctor', $doctor->id)->get();
            foreach ($doctor['photos'] as $bpkey => $bpvalue) {
                $doctor['photos'][$bpkey]['url'] = url('media/uploads/' . $doctor['photos'][$bpkey]['url']);
            }

            // Pegando os serviços do Médico
            $doctor['services'] = DoctorServices::select(['id', 'name', 'price'])->where('id_doctor', $doctor->id)->get();

            // Pegando os depoimentos do Médico
            $doctor['testimonials'] = DoctorTestimonials::select(['id', 'name', 'rate', 'body'])->where('id_doctor', $doctor->id)->get();

            // Pegando disponilidade do Médico
            $availability = [];

            // - Pegando a disponibilidade crua
            $avails = DoctorAvailability::where('id_doctor', $doctor->id)->get();
            $availWeekdays = [];
            foreach ($avails as $item) {
                $availWeekdays[$item['weekday']] = explode(',', $item['hours']);
            }

            // - Pegar os agendamentos dos próximos 20 dias
            $appointments = [];
            $appQuery = UserAppointment::where('id_doctor', $doctor->id)
                ->whereBetween('ap_datetime', [
                    date('Y-m-d') . '00:00:00',
                    date('Y-m-d', strtotime('+20 days')) . '23:59:59'
                ])
                ->get();
            foreach ($appQuery as $appItem) {
                $appointments[] = $appItem['ap_datetime'];
            }

            // - Gerar disponibilidade real
            for ($q = 0; $q < 20; $q++) {
                $timeItem = strtotime('+' . $q . 'days');
                $weekday = date('w', $timeItem);

                if (in_array($weekday, array_keys($availWeekdays))) {
                    $hours = [];

                    $dayItem = date('Y-m-d', $timeItem);

                    foreach ($availWeekdays[$weekday] as $hourItem) {
                        $dayFormated = $dayItem . ' ' . $hourItem . ':00';
                        if (!in_array($dayFormated, $appointments)) {
                            $hours[] = $hourItem;
                        }
                    }

                    if (count($hours) > 0) {
                        $availability[] = [
                            'date' => $dayItem,
                            'hours' => $hours
                        ];
                    }
                }
            }

            $doctor['available'] = $availability;

            $array['data'] = $doctor;
        } else {
            $array['error'] = 'Médico não encontrado';
            return $array;
        }
        return $array;
    }

    public function setAppointment($id,Request $request){
        // service, yarn, month, day, hour
        $array = ['error' =>''];

        $service = $request->input('service');
        $year = intval($request->input('year'));
        $month = intval($request->input('month'));
        $day = intval($request->input('day'));
        $hour = intval($request->input('hour'));

        $month = ($month < 10) ? '0'.$month : $month;
        $day = ($day < 10) ? '0'.$day : $day;
        $hour = ($hour < 10) ? '0'.$hour : $hour;

        // 1. verificar se o serviço do médico existe
        $doctorservice = DoctorServices::select()
            ->where('id', $service)
            ->where('id_doctor', $id)
        ->first();

        if($doctorservice) {
            // 2. verificar se a data é real
            $apDate = $year.'-'.$month.'-'.$day.' '.$hour.':00:00';
            if(strtotime($apDate) > 0){
                // 3. verificar se o médico já possui agendamento neste dia/hora
                $apps = UserAppointment::select()
                    ->where('id_doctor', $id)
                    ->where('ap_datetime', $apDate)
                ->count();
                if($apps === 0){
                    // 4.1 verificar se o médico atende nesta data
                    $weekday = date('w', strtotime($apDate));
                    $avail = DoctorAvailability::select()
                        ->where('id_doctor', $id)
                        ->where('weekday', $weekday)
                    ->first();
                    if($avail) {
                        // 4.2 verificar se o médico atende nesta hora
                        $hours = explode(',', $avail['hours']);
                        if(in_array($hour.':00', $hours)) {
                            // 5. fazer o agendamento
                            $newApp = new UserAppointment();
                            $newApp->id_user = $this->loggedUser->id;
                            $newApp->id_doctor = $id;
                            $newApp->id_service = $service;
                            $newApp->ap_datetime = $apDate;
                            $newApp->save();
                        } else {
                            $array['error'] = 'Médico não atende nesta hora!';
                        }

                    } else {
                        $array['error'] = 'Médico não atende neste dia!';
                    }

                } else {
                    $array['error'] = 'Data indisponível!';
                }


            } else {
                $array['error'] = 'Data inválida!';
            }

        } else {
            $array['error'] = 'Serviço inexistente!';
        }

        return $array;
    }

    public function search(Request $request) {
        $array = ['error' =>'', 'list'=>[]];

        $q = $request->input('q');

        if($q) {

            $doctors = Doctor::select()
                ->where('name', 'LIKE', '%'.$q.'%')
            ->get();
            foreach ($doctors as $bkey => $doctor) {
                $doctors[$bkey]['avatar'] = url('media/avatars/'.$doctors[$bkey]['avatar']);
            }

            $array['list'] = $doctors;

    } else {
        $array['error'] = 'Digite o que está buscando!';
    }
    return $array;
}

// buscar médico por especialidade - puxar o nome do id**
public function searchService(Request $request) {
    $array = ['error' =>'', 'list'=>[]];

    $q = $request->input('q');

    if($q) {

        $doctors = DoctorServices::select()
            ->where('name', 'LIKE', '%'.$q.'%')
        ->get();

        foreach ($doctors as $bkey => $doctor) {
            $doctors[$bkey]['avatar'] = url('media/avatars/'.$doctors[$bkey]['avatar']);
            
        }

        $array['list'] = $doctors;

} else {
    $array['error'] = 'Digite o que está buscando!';
}
return $array;
}

}
