async function authDocProducao(req, res, next) {
//req = requisição; é onde obtemos todos os outros valores sobre aquela requisição feita à API
//res = responder à API, à requisição; quando queremos enviar algo para o navegador do usuário ou para o frontend que tá acessando o endpoint
//next = função que poderá ser chamada quando que o midware continue a requisição
    
    const { senhaDigitada } = req.body;

    if(req.headers.host.includes("localhost") || req.originalUrl !== "/doc/"){
        // Usuario está no localhost 
        return next();
    }

    if(senhaDigitada === process.env.SWAGGER_SENHA_DOC){
        // Usuario digitou a senha certa
        return next();
    }

    if(senhaDigitada){
        // Usuario digitou a senha errada
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <p style="color: red;">Senha Errada!</p>
                <label for="senhaDigitada">Senha da documentação:</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada" />
                <button type="submit">Entrar</button>
            </form>
        `))
    } else{
        // Usuario ainda não digitou a senha e está em modo produção
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <label for="senhaDigitada">Senha da documentação:</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada" />
                <button type="submit">Entrar</button>
            </form>
        `))
    }
}

module.exports = authDocProducao;