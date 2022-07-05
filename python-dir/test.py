from time import sleep  

number = 0
while True:
    f = open("number.txt", "w")
    f.write(str(number))
    f.close()
    number += 1
    sleep(1)