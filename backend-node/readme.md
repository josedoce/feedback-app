### SOLID

1. Single Responsability Principle
2. Open/Closed Principle
3. Liskov Substitution Principle
4. Interface Segregation Principle
5. Dependency Invertion Principle

-------

1. Cada classe/função tem uma responsabilidade unica;

2. As classes da aplicação devem ser abertas para extensao, mas fechadas para modificação;(principio muito usado em oo)

3. Nós devemos poder substituir uma classe pai por uma herança dela e tudo continuar funcionando;

  ex: 
    
  ```java
      public class Gaviao extends Ave {}
      Ave ave = new Gaviao(); //com base no 3o principio, isso deverá funcionar.

  ```

4. Devemos segregar as interface.(principio muito usado em oo)

  ex:
  ```java
    //fere o principio 4
    public interface MegaImpressoraComTodosOsMetodos {
      void imprimirNaFolha();
      void escanearFolha();
      void digitalizarNoPdf();
    }

    public interface Imprimir {
      void naFolha();
    }

    public interface Scanner {
      void folha();
    }

    public interface Digitalizar {
      void noPdf();
    }

    //Cada interface disponibiliza seus proprios metodos
    public class Impressora implements Imprimir, Scannear, Digitalizar {}

    //isso fere o item 4.
    //ao inves de usar uma classe com milhares de metodos de um pai
    public class Impressora implements MegaImpressoraComTodosOsMetodos {}


    //ai quando você precisar somente imprimir na folha, instanciará desta forma
    Imprimir imprimir = new Impressora();
    imprimir.naFolha();

  ``` 

5. Desacoplamento ou inversão de dependencias, não deixar nada dependente um do outro.

  ex: 

  ```java

    
  
    //não temos controle sobre o fornecedor, todos eles tem metodos distintos, então devemos criar um contrato para manter todos de acordo com o desacoplamento.
    public class FornecedorDeDezembro {
      void fazerEntregas(); 
    }
    public class FornecedorDeNovembro {
      void entregar();
    }

    public class Mercadinho {
      //se um dia o fornecedor for trocado, isso dará muito trabalho...
      public Mercadinho(FornecedorDeDezembro fornecedor){
        fornecedor.fazerEntregas();
      }
    }

    //na instancia, só poderemos colocar 1 tipo de fornecedor
    Mercadinho mercadinhoEmDezembro = new Mercadinho(new FornecedorDeDezembro());

    //isso não será possivel sem aplicar o principio 5 do solid, pois está muito acoplado.
    //Mercadinho mercadinhoEmNovembro = new Mercadinho(new FornecedorDeNovembro());

    //a maneira correta é implementar um contrato(interface) para o fornecedor.
    public interface ContratoDeFornecedor {
      void: entregarProdutos();
    }

    public class FornecedorDeDezembro implements ContratoDeFornecedor {
      void fazerEntregas(); 

      void entregarProdutos(){
        this.fazerEntregar();
      }
    }
    public class FornecedorDeNovembro implements ContratoDeFornecedor{
      void entregar();

      void entregarProdutos(){
        this.entregar();
      }
    }

    //na instancia, só poderemos colocar varios fornecedores que possuem o mesmo tipo de contrato.
    Mercadinho mercadinhoEmDezembro = new Mercadinho(new FornecedorDeDezembro());

    //isso só é possivel se aplicar o principio 5 do solid.
    Mercadinho mercadinhoEmNovembro = new Mercadinho(new FornecedorDeNovembro());

    //como ficou na classe mercadinho
    public class Mercadinho {
      //se um dia o fornecedor for trocado, isso dará muito trabalho...
      public Mercadinho(ContratoDeFornecedor fornecedor){
        //a partir disso, quem possuir o contrato, deve ter um metodo entregarProdutos.
        fornecedor.entregarProdutos();
      }
    }

  ```


  ### Jest

  Para o jest entender typescript usaremos o swc
  `npm i -D @swc/jest`

  e adicionar ao jest.config.js

  ```js
    transform: {
      "^.+\\.(t|j)sx?$":["@swc/jest"]
    }
  ```