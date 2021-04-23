## Keepsake

Keepsake é um aplicativo web do tipo rede social compartilhada onde cada postagem só pode ser editada e excluída por quem a criou. A funçaõ curtir é liberada mais só uma vez por usuário. O login é feito por duas formas, o básico (criando usuário é senha) e com a conta do Google. A autenticação é por tokens json.
 
 O aplicativo pode ser acessado no endereço: [https://keepsake.netlify.app](https://keepsake.netlify.app/)
 
#### Tela Inicial
<img src="https://github.com/ManoelCabral1/Prints/blob/main/telaInicial.png" alt="Tela inicial">

#### Tela de Sign Up
<img src="https://github.com/ManoelCabral1/Prints/blob/main/telaSignup.png" alt="Tela Sign Up">

#### Tela de Sign In 
<img src="https://github.com/ManoelCabral1/Prints/blob/main/telaLogin.png" alt="Tela Sign In">

#### Tela logado 
<img src="https://github.com/ManoelCabral1/Prints/blob/main/telaLogado.png" alt="Tela logado">

#### Tela logado Google
<img src="https://github.com/ManoelCabral1/Prints/blob/main/telaLogadoGoogle.png" alt="Tela logado Google">

### BackAnd

O servidor backand é uma API REST construída em nodejs com banco de dados na nuvem (MongoDB Atlas) usando:

* Express -> para o servidor HTTP.
* Mongoose -> para criar o modelar os dados e conexão ao banco de dados.
* Cors ->  para fornecer um middleware para habilitar conexão entre domínios HTTP.
* jsonwebtoken -> fornece middleware Express para validar JWTs (JSON Web Tokens).
* bcryptjs -> codificar as senhas en hash para transporte seguro.

### FrontAnd
Aplicativo React construído usando:

* Axios -> para conexão com a Api REST do backand.
* Redux -> para gerenciamento de estado.
* jwt-decode -> autenticação JSON Web Tokens.
* react-file-base64 -> codificar os arquivos de imagens em cadeias de caracteres para armazenar no banco de dados.
* react-google-login -> login com a conta Google.
* moment -> manipulação de datas.
* material-ui -> biblioteca de componentes para React sólidos pré-estilizados e design moderno.
