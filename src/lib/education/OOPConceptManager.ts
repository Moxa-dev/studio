import type { OOPTip } from '@/types/game';

export interface OOPConcept {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  codeExample: string;
  realWorldExample: string;
  relatedConcepts: string[];
  exercises: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export class OOPConceptManager {
  private concepts: Map<string, OOPConcept> = new Map();
  private userProgress: Map<string, {
    completed: boolean;
    score: number;
    lastAttempt: Date;
  }> = new Map();

  constructor() {
    this.initializeConcepts();
  }

  private initializeConcepts(): void {
    // Objects & Classes
    this.addConcept({
      id: 'objects-classes',
      name: 'Objects & Classes',
      description: 'Learn how objects are instances of classes, and how classes serve as blueprints for creating objects.',
      difficulty: 'beginner',
      codeExample: `class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    return 'Woof!';
  }
}

const myDog = new Dog('Rex');`,
      realWorldExample: 'Think of a class as a blueprint for a house, and objects as the actual houses built from that blueprint.',
      relatedConcepts: ['encapsulation', 'methods'],
      exercises: [
        {
          question: 'What is the relationship between a class and an object?',
          options: [
            'A class is an instance of an object',
            'An object is an instance of a class',
            'They are the same thing',
            'They are unrelated'
          ],
          correctAnswer: 1,
          explanation: 'An object is an instance of a class. The class defines the structure and behavior, while objects are specific instances created from that class.'
        },
        {
          question: 'What is a constructor in a class?',
          options: [
            'A method that destroys the object',
            'A special method that initializes a new object',
            'A method that returns the class name',
            'A method that checks if the object is valid'
          ],
          correctAnswer: 1,
          explanation: 'A constructor is a special method that is called when creating a new object. It initializes the object with initial values.'
        },
        {
          question: 'Which of the following is true about classes?',
          options: [
            'A class can only have one method',
            'A class can have multiple methods and properties',
            'A class must have at least one object',
            'A class cannot have properties'
          ],
          correctAnswer: 1,
          explanation: 'Classes can have multiple methods and properties that define the behavior and state of objects created from them.'
        },
        {
          question: 'What is the purpose of the "new" keyword when creating objects?',
          options: [
            'To delete an existing object',
            'To create a new instance of a class',
            'To update an existing object',
            'To check if an object exists'
          ],
          correctAnswer: 1,
          explanation: 'The "new" keyword is used to create a new instance of a class, allocating memory for the object and calling its constructor.'
        },
        {
          question: 'What is a class method?',
          options: [
            'A function that can only be called outside the class',
            'A function defined within a class that operates on class data',
            'A function that can only be called once',
            'A function that must return a value'
          ],
          correctAnswer: 1,
          explanation: 'A class method is a function defined within a class that can operate on the class data and perform specific actions.'
        },
        {
          question: 'What is the difference between a class property and a class method?',
          options: [
            'Properties store data, methods perform actions',
            'Properties perform actions, methods store data',
            'There is no difference',
            'Properties are public, methods are private'
          ],
          correctAnswer: 0,
          explanation: 'Class properties store data or state, while class methods define behavior or actions that can be performed on that data.'
        },
        {
          question: 'What is the "this" keyword used for in a class?',
          options: [
            'To refer to the current instance of the class',
            'To create a new instance',
            'To delete the current instance',
            'To check if an instance exists'
          ],
          correctAnswer: 0,
          explanation: 'The "this" keyword refers to the current instance of the class, allowing access to its properties and methods.'
        },
        {
          question: 'What is a static method in a class?',
          options: [
            'A method that can only be called on instances',
            'A method that belongs to the class itself, not instances',
            'A method that cannot be called',
            'A method that must be called first'
          ],
          correctAnswer: 1,
          explanation: 'A static method belongs to the class itself rather than instances of the class, and can be called without creating an object.'
        },
        {
          question: 'What is the purpose of a class property?',
          options: [
            'To store data that belongs to instances of the class',
            'To perform actions',
            'To create new instances',
            'To delete instances'
          ],
          correctAnswer: 0,
          explanation: 'Class properties store data that belongs to instances of the class, representing the state of each object.'
        },
        {
          question: 'What happens when you create multiple objects from the same class?',
          options: [
            'They share the same memory space',
            'Each object gets its own copy of properties',
            'Only the first object is created',
            'An error occurs'
          ],
          correctAnswer: 1,
          explanation: 'When you create multiple objects from the same class, each object gets its own copy of the properties, allowing them to have different values.'
        },
        {
          question: 'What is the difference between a class and an object in terms of memory?',
          options: [
            'A class takes up memory, an object does not',
            'A class is a template in memory, objects are instances that use memory',
            'They use the same amount of memory',
            'Neither uses memory'
          ],
          correctAnswer: 1,
          explanation: 'A class is a template that exists in memory, while objects are instances that use memory to store their specific data.'
        },
        {
          question: 'What is the purpose of a class definition?',
          options: [
            'To create objects directly',
            'To define the structure and behavior of objects',
            'To delete objects',
            'To modify existing objects'
          ],
          correctAnswer: 1,
          explanation: 'A class definition specifies the structure (properties) and behavior (methods) that objects created from the class will have.'
        },
        {
          question: 'What is the relationship between class properties and object state?',
          options: [
            'Properties define the possible states an object can have',
            'Properties and state are unrelated',
            'Properties can only be used in methods',
            'Properties must be constant'
          ],
          correctAnswer: 0,
          explanation: 'Class properties define the possible states that objects created from the class can have, representing their data.'
        }
      ]
    });

    // Inheritance
    this.addConcept({
      id: 'inheritance',
      name: 'Inheritance',
      description: 'Learn how classes can inherit properties and methods from other classes.',
      difficulty: 'intermediate',
      codeExample: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return 'Some sound';
  }
}

class Dog extends Animal {
  speak() {
    return 'Woof!';
  }
}`,
      realWorldExample: 'Just like children inherit traits from their parents, classes can inherit properties and methods from parent classes.',
      relatedConcepts: ['polymorphism', 'objects-classes'],
      exercises: [
        {
          question: 'What is the main benefit of inheritance?',
          options: [
            'It makes code run faster',
            'It allows code reuse and establishes relationships between classes',
            'It reduces memory usage',
            'It makes debugging easier'
          ],
          correctAnswer: 1,
          explanation: 'Inheritance allows code reuse and establishes a relationship between classes, making the code more organized and maintainable.'
        },
        {
          question: 'What happens when a child class overrides a parent method?',
          options: [
            'The parent method is deleted',
            'The child class provides its own implementation of the method',
            'Both parent and child methods are called',
            'An error occurs'
          ],
          correctAnswer: 1,
          explanation: 'When a child class overrides a parent method, it provides its own implementation while maintaining the same method signature.'
        },
        {
          question: 'Which keyword is used to inherit from a parent class?',
          options: [
            'implements',
            'extends',
            'inherits',
            'super'
          ],
          correctAnswer: 1,
          explanation: 'The "extends" keyword is used to create a child class that inherits from a parent class.'
        },
        {
          question: 'What is the purpose of the "super" keyword in inheritance?',
          options: [
            'To create a new parent class',
            'To call methods or access properties of the parent class',
            'To delete the parent class',
            'To check if inheritance is possible'
          ],
          correctAnswer: 1,
          explanation: 'The "super" keyword is used to call methods or access properties of the parent class from the child class.'
        },
        {
          question: 'What is multiple inheritance?',
          options: [
            'A class inheriting from multiple parent classes',
            'A class having multiple child classes',
            'A class with multiple methods',
            'A class with multiple properties'
          ],
          correctAnswer: 0,
          explanation: 'Multiple inheritance is when a class inherits from multiple parent classes, though this is not supported in all programming languages.'
        },
        {
          question: 'What is the difference between single and multiple inheritance?',
          options: [
            'Single inheritance allows one parent, multiple allows many',
            'Single inheritance is faster than multiple',
            'Multiple inheritance is not possible',
            'There is no difference'
          ],
          correctAnswer: 0,
          explanation: 'Single inheritance allows a class to inherit from only one parent class, while multiple inheritance allows inheriting from multiple parent classes.'
        },
        {
          question: 'What is method overriding in inheritance?',
          options: [
            'Deleting a parent method',
            'Providing a new implementation of a parent method in the child class',
            'Creating a new method with a different name',
            'Copying a method from another class'
          ],
          correctAnswer: 1,
          explanation: 'Method overriding is when a child class provides its own implementation of a method that is already defined in its parent class.'
        },
        {
          question: 'What is the relationship between parent and child classes?',
          options: [
            'Child classes are more specific versions of parent classes',
            'Parent classes are more specific than child classes',
            'They are completely independent',
            'They must have the same methods'
          ],
          correctAnswer: 0,
          explanation: "Child classes are more specific versions of their parent classes, inheriting and potentially extending or modifying the parent's functionality."
        },
        {
          question: 'What is the purpose of abstract classes in inheritance?',
          options: [
            'To provide a base class that cannot be instantiated',
            'To create multiple instances',
            'To delete child classes',
            'To prevent inheritance'
          ],
          correctAnswer: 0,
          explanation: 'Abstract classes provide a base class that cannot be instantiated directly, serving as a template for child classes to implement.'
        },
        {
          question: 'What is the difference between inheritance and composition?',
          options: [
            'Inheritance is "is-a" relationship, composition is "has-a"',
            'Inheritance is faster than composition',
            'Composition is not possible',
            'There is no difference'
          ],
          correctAnswer: 0,
          explanation: 'Inheritance represents an "is-a" relationship (a Dog is an Animal), while composition represents a "has-a" relationship (a Car has an Engine).'
        },
        {
          question: 'What is the purpose of protected members in inheritance?',
          options: [
            'To allow access only within the class and its subclasses',
            'To make members public',
            'To prevent inheritance',
            'To delete members'
          ],
          correctAnswer: 0,
          explanation: 'Protected members are accessible within the class and its subclasses, providing a middle ground between private and public access.'
        },
        {
          question: 'What is the inheritance hierarchy?',
          options: [
            'The structure of parent-child relationships between classes',
            'A way to delete classes',
            'A method of creating objects',
            'A type of variable'
          ],
          correctAnswer: 0,
          explanation: 'The inheritance hierarchy represents the structure of parent-child relationships between classes, showing how classes are related through inheritance.'
        },
        {
          question: 'What is the purpose of interface inheritance?',
          options: [
            'To define a contract that classes must implement',
            'To create objects',
            'To delete methods',
            'To prevent inheritance'
          ],
          correctAnswer: 0,
          explanation: 'Interface inheritance defines a contract that classes must implement, ensuring they provide specific methods and properties.'
        }
      ]
    });

    // Encapsulation
    this.addConcept({
      id: 'encapsulation',
      name: 'Encapsulation',
      description: "Encapsulation is the bundling of data and methods that operate on that data within one unit, like a class, and restricting access to some of the object's components.",
      difficulty: 'beginner',
      codeExample: `class Person {
  #ssn;
  constructor(name, ssn) {
    this.name = name;
    this.#ssn = ssn; // private field
  }
  getSSN() {
    return this.#ssn;
  }
}`,
      realWorldExample: "Think of a capsule that contains medicine. You can only access the medicine in a controlled way. Similarly, encapsulation restricts direct access to some of an object's components.",
      relatedConcepts: ['objects-classes', 'abstraction'],
      exercises: [
        {
          question: 'What does encapsulation help achieve?',
          options: [
            'Faster code execution',
            "Restricting direct access to some of an object's components",
            'Making all data public',
            'None of the above'
          ],
          correctAnswer: 1,
          explanation: "Encapsulation restricts direct access to some of an object's components, which helps protect the integrity of the data."
        },
        {
          question: 'What is a private field in encapsulation?',
          options: [
            'A field that can be accessed from anywhere',
            'A field that can only be accessed within the class',
            'A field that is shared between all objects',
            'A field that cannot be modified'
          ],
          correctAnswer: 1,
          explanation: 'A private field can only be accessed within the class itself, providing better control over data access.'
        },
        {
          question: 'Why do we use getter methods in encapsulation?',
          options: [
            'To make the code run faster',
            'To provide controlled access to private data',
            'To delete private data',
            'To make all data public'
          ],
          correctAnswer: 1,
          explanation: 'Getter methods provide controlled access to private data, allowing us to implement validation or additional logic when accessing the data.'
        },
        {
          question: 'What is the purpose of setter methods in encapsulation?',
          options: [
            'To delete data',
            'To provide controlled modification of private data',
            'To make data public',
            'To prevent data access'
          ],
          correctAnswer: 1,
          explanation: 'Setter methods provide controlled modification of private data, allowing validation and ensuring data integrity.'
        },
        {
          question: 'What is data hiding in encapsulation?',
          options: [
            'Making data completely inaccessible',
            'Restricting direct access to data and providing controlled access methods',
            'Deleting data',
            'Making all data public'
          ],
          correctAnswer: 1,
          explanation: 'Data hiding is the practice of restricting direct access to data and providing controlled access methods to maintain data integrity.'
        },
        {
          question: 'What is the difference between public and private members?',
          options: [
            'Public members are accessible everywhere, private only within the class',
            'Private members are faster than public',
            'Public members cannot be modified',
            'There is no difference'
          ],
          correctAnswer: 0,
          explanation: 'Public members are accessible from anywhere, while private members can only be accessed within the class itself.'
        },
        {
          question: 'What is the purpose of access modifiers in encapsulation?',
          options: [
            'To control how class members can be accessed',
            'To make code run faster',
            'To delete class members',
            'To prevent inheritance'
          ],
          correctAnswer: 0,
          explanation: 'Access modifiers control how class members can be accessed, helping to implement encapsulation and data hiding.'
        },
        {
          question: 'What is the benefit of using private methods?',
          options: [
            'To hide implementation details and prevent external access',
            'To make methods run faster',
            'To prevent inheritance',
            'To make all methods public'
          ],
          correctAnswer: 0,
          explanation: 'Private methods hide implementation details and prevent external access, helping to maintain encapsulation.'
        },
        {
          question: 'What is the relationship between encapsulation and data integrity?',
          options: [
            'Encapsulation helps maintain data integrity by controlling access',
            'They are unrelated',
            'Encapsulation prevents data integrity',
            'Data integrity is not important'
          ],
          correctAnswer: 0,
          explanation: 'Encapsulation helps maintain data integrity by controlling how data can be accessed and modified.'
        },
        {
          question: 'What is the purpose of read-only properties in encapsulation?',
          options: [
            'To allow reading but prevent modification of data',
            'To make properties faster',
            'To prevent reading data',
            'To make all properties writable'
          ],
          correctAnswer: 0,
          explanation: 'Read-only properties allow reading but prevent modification of data, providing a way to expose data without allowing changes.'
        },
        {
          question: 'What is the difference between encapsulation and abstraction?',
          options: [
            'Encapsulation is about data hiding, abstraction is about hiding complexity',
            'They are the same thing',
            'Abstraction is about data hiding',
            'There is no difference'
          ],
          correctAnswer: 0,
          explanation: 'Encapsulation is about hiding data and implementation details, while abstraction is about hiding complexity and showing only essential features.'
        },
        {
          question: 'What is the purpose of protected members in encapsulation?',
          options: [
            'To allow access within the class and its subclasses',
            'To make members public',
            'To prevent access',
            'To delete members'
          ],
          correctAnswer: 0,
          explanation: 'Protected members allow access within the class and its subclasses, providing a middle ground between private and public access.'
        },
        {
          question: 'What is the benefit of using getters and setters?',
          options: [
            'To provide controlled access and modification of data',
            'To make code run faster',
            'To prevent data access',
            'To make all data public'
          ],
          correctAnswer: 0,
          explanation: 'Getters and setters provide controlled access and modification of data, allowing validation and maintaining data integrity.'
        }
      ]
    });

    // Polymorphism
    this.addConcept({
      id: 'polymorphism',
      name: 'Polymorphism',
      description: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass. It is the ability to present the same interface for different underlying forms (data types).',
      difficulty: 'intermediate',
      codeExample: `class Animal {
  speak() { return 'Some sound'; }
}
class Dog extends Animal {
  speak() { return 'Woof!'; }
}
class Cat extends Animal {
  speak() { return 'Meow!'; }
}
const animals = [new Dog(), new Cat()];
animals.forEach(animal => console.log(animal.speak()));`,
      realWorldExample: 'A person can be a student, an employee, or a parent. The same person behaves differently in different roles. Similarly, polymorphism allows the same interface to be used for different underlying forms.',
      relatedConcepts: ['inheritance', 'abstraction'],
      exercises: [
        {
          question: 'What is polymorphism in OOP?',
          options: [
            'The ability of a class to inherit from multiple classes',
            'The ability to present the same interface for different data types',
            'Restricting access to data',
            'None of the above'
          ],
          correctAnswer: 1,
          explanation: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass, presenting the same interface for different data types.'
        },
        {
          question: 'What is method overriding in polymorphism?',
          options: [
            'Deleting a method from the parent class',
            'Providing a specific implementation of a method in a child class',
            'Creating a new method with the same name',
            'Copying a method from another class'
          ],
          correctAnswer: 1,
          explanation: 'Method overriding allows a child class to provide a specific implementation of a method that is already defined in its parent class.'
        },
        {
          question: 'Which of the following demonstrates polymorphism?',
          options: [
            'Creating multiple objects of the same class',
            'Using the same method name with different implementations in different classes',
            'Having multiple properties in a class',
            'Using different variable names'
          ],
          correctAnswer: 1,
          explanation: 'Polymorphism is demonstrated when different classes implement the same method name with different behaviors.'
        },
        {
          question: 'What is runtime polymorphism?',
          options: [
            'Polymorphism that is resolved at runtime',
            'Polymorphism that only works at compile time',
            'A type of inheritance',
            'A way to create objects'
          ],
          correctAnswer: 0,
          explanation: 'Runtime polymorphism is when the method to be called is determined at runtime based on the actual object type.'
        },
        {
          question: 'What is the difference between method overloading and overriding?',
          options: [
            'Overloading is same method name with different parameters, overriding is same method in child class',
            'Overloading is faster than overriding',
            'Overriding is not possible',
            'There is no difference'
          ],
          correctAnswer: 0,
          explanation: 'Method overloading is having the same method name with different parameters, while overriding is providing a new implementation in a child class.'
        },
        {
          question: 'What is the purpose of abstract methods in polymorphism?',
          options: [
            'To define a method that must be implemented by child classes',
            'To prevent method implementation',
            'To make methods faster',
            'To delete methods'
          ],
          correctAnswer: 0,
          explanation: 'Abstract methods define a method that must be implemented by child classes, ensuring polymorphic behavior.'
        },
        {
          question: 'What is the relationship between polymorphism and inheritance?',
          options: [
            'Polymorphism often requires inheritance to work',
            'They are unrelated',
            'Inheritance prevents polymorphism',
            'They cannot be used together'
          ],
          correctAnswer: 0,
          explanation: 'Polymorphism often requires inheritance to work, as it allows different classes to be treated as instances of a common superclass.'
        },
        {
          question: 'What is the purpose of interfaces in polymorphism?',
          options: [
            'To define a contract that classes must implement',
            'To prevent polymorphism',
            'To make code run faster',
            'To delete methods'
          ],
          correctAnswer: 0,
          explanation: 'Interfaces define a contract that classes must implement, enabling polymorphism without inheritance.'
        },
        {
          question: 'What is the benefit of using polymorphism?',
          options: [
            'To write more flexible and reusable code',
            'To make code run faster',
            'To prevent code reuse',
            'To make code more complex'
          ],
          correctAnswer: 0,
          explanation: 'Polymorphism allows writing more flexible and reusable code by treating different objects uniformly.'
        },
        {
          question: 'What is the difference between static and dynamic polymorphism?',
          options: [
            'Static is resolved at compile time, dynamic at runtime',
            'Static is faster than dynamic',
            'Dynamic is not possible',
            'There is no difference'
          ],
          correctAnswer: 0,
          explanation: 'Static polymorphism is resolved at compile time (method overloading), while dynamic polymorphism is resolved at runtime (method overriding).'
        },
        {
          question: 'What is the purpose of virtual methods in polymorphism?',
          options: [
            'To allow method overriding in derived classes',
            'To prevent method overriding',
            'To make methods faster',
            'To delete methods'
          ],
          correctAnswer: 0,
          explanation: 'Virtual methods allow method overriding in derived classes, enabling runtime polymorphism.'
        },
        {
          question: 'What is the relationship between polymorphism and abstraction?',
          options: [
            'Polymorphism often uses abstraction to define interfaces',
            'They are unrelated',
            'Abstraction prevents polymorphism',
            'They cannot be used together'
          ],
          correctAnswer: 0,
          explanation: 'Polymorphism often uses abstraction to define interfaces that different classes can implement.'
        },
        {
          question: 'What is the purpose of type casting in polymorphism?',
          options: [
            'To treat an object as a different type',
            'To prevent polymorphism',
            'To make code run faster',
            'To delete objects'
          ],
          correctAnswer: 0,
          explanation: 'Type casting allows treating an object as a different type, which is sometimes necessary when working with polymorphic objects.'
        }
      ]
    });

    // Abstraction
    this.addConcept({
      id: 'abstraction',
      name: 'Abstraction',
      description: 'Abstraction is the concept of hiding the complex implementation details and showing only the necessary features of an object. It helps in reducing programming complexity and effort.',
      difficulty: 'intermediate',
      codeExample: `abstract class Vehicle {
  abstract start(): void;
  abstract stop(): void;
  getInfo() {
    return 'This is a vehicle';
  }
}
class Car extends Vehicle {
  start() { console.log('Car started'); }
  stop() { console.log('Car stopped'); }
}`,
      realWorldExample: "A car's steering wheel, pedals, and gear shift are abstractions. You don't need to know how the engine works internally to drive the car. Similarly, abstraction in programming hides complex implementation details.",
      relatedConcepts: ['encapsulation', 'polymorphism'],
      exercises: [
        {
          question: 'What is abstraction in OOP?',
          options: [
            'Hiding complex implementation details and showing only necessary features',
            'Creating multiple objects',
            'Storing data in variables',
            'None of the above'
          ],
          correctAnswer: 0,
          explanation: 'Abstraction is the concept of hiding complex implementation details and showing only the necessary features of an object.'
        },
        {
          question: 'What is an abstract class?',
          options: [
            'A class that cannot be instantiated and may contain abstract methods',
            'A class that can only be used once',
            'A class that cannot have methods',
            'A class that cannot have properties'
          ],
          correctAnswer: 0,
          explanation: 'An abstract class is a class that cannot be instantiated and may contain abstract methods that must be implemented by its subclasses.'
        },
        {
          question: 'What is the purpose of abstract methods?',
          options: [
            'To define a method that must be implemented by subclasses',
            'To prevent method implementation',
            'To make methods faster',
            'To delete methods'
          ],
          correctAnswer: 0,
          explanation: 'Abstract methods define a method that must be implemented by subclasses, ensuring a contract for implementation.'
        },
        {
          question: 'What is the difference between abstraction and encapsulation?',
          options: [
            'Abstraction hides complexity, encapsulation hides data',
            'They are the same thing',
            'Abstraction is faster than encapsulation',
            'There is no difference'
          ],
          correctAnswer: 0,
          explanation: 'Abstraction hides complexity by showing only necessary features, while encapsulation hides data by bundling it with methods.'
        },
        {
          question: 'What is the benefit of using abstraction?',
          options: [
            'To reduce complexity and improve code maintainability',
            'To make code run faster',
            'To prevent code reuse',
            'To make code more complex'
          ],
          correctAnswer: 0,
          explanation: 'Abstraction helps reduce complexity and improve code maintainability by hiding implementation details.'
        },
        {
          question: 'What is the relationship between abstraction and interfaces?',
          options: [
            'Interfaces are a way to achieve abstraction',
            'They are unrelated',
            'Interfaces prevent abstraction',
            'They cannot be used together'
          ],
          correctAnswer: 0,
          explanation: 'Interfaces are a way to achieve abstraction by defining a contract that classes must implement.'
        },
        {
          question: 'What is the purpose of abstract properties?',
          options: [
            'To define properties that must be implemented by subclasses',
            'To prevent property implementation',
            'To make properties faster',
            'To delete properties'
          ],
          correctAnswer: 0,
          explanation: 'Abstract properties define properties that must be implemented by subclasses, ensuring a contract for implementation.'
        },
        {
          question: 'What is the difference between abstract classes and interfaces?',
          options: [
            'Abstract classes can have implementation, interfaces cannot',
            'They are the same thing',
            'Interfaces are faster than abstract classes',
            'There is no difference'
          ],
          correctAnswer: 0,
          explanation: 'Abstract classes can have implementation details, while interfaces can only define the contract.'
        },
        {
          question: 'What is the purpose of abstraction in software design?',
          options: [
            'To create a clear separation between interface and implementation',
            'To prevent code reuse',
            'To make code run faster',
            'To make code more complex'
          ],
          correctAnswer: 0,
          explanation: 'Abstraction helps create a clear separation between interface and implementation, making code more maintainable.'
        },
        {
          question: 'What is the relationship between abstraction and inheritance?',
          options: [
            'Abstraction often uses inheritance to define abstract classes',
            'They are unrelated',
            'Inheritance prevents abstraction',
            'They cannot be used together'
          ],
          correctAnswer: 0,
          explanation: 'Abstraction often uses inheritance to define abstract classes that subclasses must implement.'
        },
        {
          question: 'What is the purpose of abstract constructors?',
          options: [
            'To ensure proper initialization of abstract classes',
            'To prevent constructor implementation',
            'To make constructors faster',
            'To delete constructors'
          ],
          correctAnswer: 0,
          explanation: 'Abstract constructors ensure proper initialization of abstract classes and their subclasses.'
        },
        {
          question: 'What is the benefit of using abstract classes over interfaces?',
          options: [
            'Abstract classes can provide default implementation',
            'They are faster than interfaces',
            'They prevent code reuse',
            'There is no benefit'
          ],
          correctAnswer: 0,
          explanation: 'Abstract classes can provide default implementation that subclasses can inherit, while interfaces cannot.'
        },
        {
          question: 'What is the purpose of abstraction in API design?',
          options: [
            'To provide a simple interface for complex functionality',
            'To prevent API usage',
            'To make APIs faster',
            'To make APIs more complex'
          ],
          correctAnswer: 0,
          explanation: 'Abstraction in API design provides a simple interface for complex functionality, making it easier to use.'
        }
      ]
    });

    // Add more concepts...
  }

  private addConcept(concept: OOPConcept): void {
    this.concepts.set(concept.id, concept);
    this.userProgress.set(concept.id, {
      completed: false,
      score: 0,
      lastAttempt: new Date()
    });
  }

  getConcept(id: string): OOPConcept | null {
    return this.concepts.get(id) || null;
  }

  getAllConcepts(): OOPConcept[] {
    return Array.from(this.concepts.values());
  }

  getConceptsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): OOPConcept[] {
    return this.getAllConcepts().filter(concept => concept.difficulty === difficulty);
  }

  getRelatedConcepts(conceptId: string): OOPConcept[] {
    const concept = this.concepts.get(conceptId);
    if (!concept) return [];
    
    return concept.relatedConcepts
      .map(id => this.concepts.get(id))
      .filter((concept): concept is OOPConcept => concept !== null);
  }

  updateProgress(conceptId: string, score: number): void {
    const progress = this.userProgress.get(conceptId);
    if (progress) {
      this.userProgress.set(conceptId, {
        completed: score >= 80, // Consider completed if score is 80% or higher
        score: Math.max(progress.score, score),
        lastAttempt: new Date()
      });
    }
  }

  getProgress(conceptId: string) {
    return this.userProgress.get(conceptId);
  }

  getOverallProgress(): {
    total: number;
    completed: number;
    averageScore: number;
  } {
    const progress = Array.from(this.userProgress.values());
    return {
      total: progress.length,
      completed: progress.filter(p => p.completed).length,
      averageScore: progress.reduce((sum, p) => sum + p.score, 0) / progress.length
    };
  }

  generateTip(conceptId: string): OOPTip | null {
    const concept = this.concepts.get(conceptId);
    if (!concept) return null;

    return {
      concept: concept.name,
      explanation: concept.description,
      codeExample: concept.codeExample
    };
  }
}

// Create and export a singleton instance
export const oopConceptManager = new OOPConceptManager(); 