// 定义一个工厂类
class AnimalFactory {
  // 静态工厂方法，根据类型创建不同的动物对象
  static createAnimal(type) {
    if (type === "dog") {
      return new Dog()
    } else if (type === "cat") {
      return new Cat()
    } else {
      throw new Error("Invalid type: " + type)
    }
  }
}

// 定义动物类
class Dog {
  sound() {
    console.log("Woof!")
  }
}

class Cat {
  sound() {
    console.log("Meow!")
  }
}

// 使用工厂方法创建对象
const dog = AnimalFactory.createAnimal("dog")
const cat = AnimalFactory.createAnimal("cat")

dog.sound() // 输出: Woof!
cat.sound() // 输出: Meow!

/**
 * 四. 简单工厂模式的优缺点
以上我们了解到简单工厂模式是一种创建对象的设计模式，它具有以下优点和缺点：
1. 优点：
封装了对象的创建逻辑，客户端只需通过工厂函数来创建对象，而不需要了解具体的创建过程，降低了客户端的复杂性和依赖性。
可以集中管理对象的创建逻辑，方便统一修改和维护。如果需要新增或修改对象的创建方式只需修改工厂函数中的代码即可，而不需要修改客户端的代码。
实现了对象创建解耦，客户端与工厂函数进行交互，不直接依赖具体的类，增加了灵活性和可扩展性。

2. 缺点：
违背了开闭原则，需要新增一种类型的对象时，必须修改工厂函数的代码，增加了厂函数的维护成本。
创建对象的逻辑集中工厂函数中，导致工厂函数的代码可能过于复杂，不易维护和扩展。
不符合单一职责原则，一个工厂函数负责创建多种类型的对象，当对象创建逻辑复杂时，工厂函数会变得臃肿。、
 */
