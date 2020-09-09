module.exports = {
// Respostas de sucesso
    OK,
    Created,
    NoContent,
    
// Respostas de erro do Cliente
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    
// Respostas de erro do Servidor
    InternalServerError
};

// Respostas de sucesso
// 200 OK
function OK (response, dto = undefined){
    response
        .status(200)
        .json(dto);
}

// 201 Created
function Created (response, dto = undefined){
    response
        .status(201)
        .json(dto);
}

// 204 No Content
function NoContent (response){
    response
        .status(204);
}

// Respostas de erro do Cliente
// 400 Bad Request
function BadRequest (response, dto = undefined){
    if (dto) {
        dto.unshift({"message": "O servidor não entendeu a requisição pois está com uma sintaxe inválida."});
    } else {
        dto = [{"message": "O servidor não entendeu a requisição pois está com uma sintaxe inválida."}];
    }

    response
        .status(400)
        .json({"error": dto});
}

// 401 Unauthorized
function Unauthorized (response, dto = undefined){
    if (dto) {
        dto.unshift({"message": "O usuário deve se autenticar para obter a resposta solicitada."});
    } else {
        dto = [{"message": "O usuário deve se autenticar para obter a resposta solicitada."}];
    }

    response
        .status(401)
        .json({"error": dto});
}

// 403 Forbidden
function Forbidden (response, dto = undefined){
    if (dto) {
        dto.unshift({"message": "Ops, você não possui permissão de acesso."});
    } else {
        dto = [{"message": "Ops, você não possui permissão de acesso."}];
    }
    
    response
        .status(403)
        .json({"error": dto});
}

// 404 Not Found
function NotFound (response){
    response
        .status(404);
}

// Respostas de erro do Servidor
// 500 Internal Server Error
function InternalServerError (response, dto = undefined){
    if (dto) {
        dto.unshift({"message": "Ops, ocorreu um erro inesperado. Tente novamente mais tarde."});
    } else {
        dto = [{"message": "Ops, ocorreu um erro inesperado. Tente novamente mais tarde."}];
    }

    response
        .status(500)
        .json({"error": dto});
}