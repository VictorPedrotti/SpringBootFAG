# SpringBootFAG
Projeto utilizando springboot para aula do Elenilton

A classe SnakeGame.java é responsável por configurar e iniciar uma aplicação Spring Boot. A anotação @SpringBootApplication simplifica a configuração, e o método main inicia a aplicação, acionando o mecanismo
interno do Spring Boot para inicialização.

A classe SnakeController Indica que a classe SnakeController é um controlador no padrão MVC do Spring. Controladores são responsáveis por lidar com requisições e retornar respostas.
A anotação GetMapping Mapeia o método index para lidar com requisições HTTP GET na raiz ("/") do aplicativo.
O método ModelAndView é chamado quando uma requisição GET é feita para a raiz do aplicativo e retorna um objeto ModelAndView, que é usado para encapsular o modelo.
Depois define o nome da visualização como "home/index". Isso indica que o Spring procurará por um arquivo de visualização chamado "index" na pasta "home" e retorna Retorna o objeto ModelAndView,
que será processado pelo Spring para renderizar a visualização correspondente.

O HTML utiliza a propriedade canvas para execução da aplicação, onde é definida uma "tela" que pode ser preenchida por coordenadas.

O javaScript é responsável por definir as coordenas dos objetos e imprimí-los, além de fazer a movimentação e demais funcionalidades que serão explicadas abaixo:

Funções:
DrawFood: responsável por gerar uma comida com posição e cor aleatória. Ocorre a validação para verificar se a posição não corresponde a alguma parte da cobra antes da impressão.

DrawSnake: define a posição atual da cobra e suas cores, diferenciando corpo e cabeça.

MoveSnake: responsável por definir a direção do movimento através do valor da variável direction, definida através das teclas que são precionadas pelo usuário.

DrawGrid: desenha uma grind tanto horizontal quanto vertical.

CheckEat: verifica se a cobra comeu a comida. Isso ocorre quando a posição da cabeça é a mesma que da comida, fazendo com que outra comida seja gerada e o vetor da cobra ganhe uma posição nova.

CheckCollsion: verifica se a cobra ultrapassou o limite do canvas ou bateu nela mesma, essa verificação ocorre através da posição da cabeça.

GameOver: chamada dentro da função checkCollision. Basicamente, quando o jogador perde. Altera elementos do HTML para fazer a chamada da tela de Game Over. Verifica quando o usuário clicou em jogar novamente.

GameLoop: responsável por fazer a limpeza do canvas e chamar todas as funções que serão impressas para movimentação dos objetos. Também é possível determinar a velocidade do jogo.

