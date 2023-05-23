<?php
// index.php

// Obtém a URL da solicitação
$url = isset($_GET['url']) ? $_GET['url'] : '';

// Define as rotas e seus controladores correspondentes
$routes = [
    '' => 'HomeController',
    // Adicione mais rotas conforme necessário
];

// Verifica se a rota existe
if (array_key_exists($url, $routes)) {
    // Obtém o nome do controlador correspondente à rota
    $controllerName = $routes[$url];
    
    // Inclui o arquivo do controlador
    require_once 'controllers/' . $controllerName . '.php';
    
    // Instancia o controlador
    $controller = new $controllerName();
    
    // Chama o método padrão do controlador (por exemplo, "index" ou "home")
    $controller->index();
} else {
    // Rota inválida, exiba uma página de erro ou redirecione para a página inicial
    echo 'Página não encontrada.';
}
