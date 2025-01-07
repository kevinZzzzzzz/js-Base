package cangjieTest
import std.random.*

main() {
    // let number: Int8 = Random().nextInt8()
    // println(number)

    // if (number % 2 == 0) {
    //     println("偶数")
    // } else {
    //     println("奇数")
    // }

    let speed = Random().nextFloat64() * 20.0
    println("${speed} km/s")
    if (speed > 16.7) {
        println("第三宇宙速度，鹊桥相会")
    } else if (speed > 11.2) {
        println("第二宇宙速度，嫦娥奔月")
    } else if (speed > 7.9) {
        println("第一宇宙速度，腾云驾雾")
    } else {
        println("脚踏实地，仰望星空")
    }
 let metaArray = [r'甲', r'乙', r'丙', r'丁', r'戊',
        r'己', r'庚', r'辛', r'壬', r'癸']
    let noumenonArray = [r'寅', r'卯', r'辰', r'巳', r'午', r'未',
        r'申', r'酉', r'戌', r'亥', r'子', r'丑']
    let year = 2024
    // 年份对应的天干索引
    let metaOfYear = ((year % 10) + 10 - 4) % 10
    // 此年首月对应的天干索引
    var index = (2 * metaOfYear + 3) % 10 - 1
    println("农历 2024 年各月干支：")
    for (noumenon in noumenonArray) {
        print("${metaArray[index]}${noumenon} ")
        index = (index + 1) % 10
    }


    let he: Rune = r'\u{4f60}'
    let llo: Rune = r'\u{597d}'
    print(he)
    print(llo)
       let fruit = "apples"
    let count = 10
    let s = "There are ${count * count} ${fruit}"
    println(s)

    let r = 2.4
    let area = "The area of a circle with radius ${r} is ${let PI = 3.141592; PI * r * r}"
    println(area)

    let pi = (3.14, 'PI')
    println(pi[0])
    print(pi[1])
}