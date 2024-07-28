from base64 import b64decode
from threading import Thread
from io import BytesIO
from numpy import where, all, transpose, array
from cv2 import cvtColor, TM_CCOEFF_NORMED, COLOR_BGR2GRAY, matchTemplate
from pygetwindow import getWindowsWithTitle
from mss import mss
from pyautogui import click
from keyboard import is_pressed
from PIL.Image import open
button_base64 = """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
htDZMjGAAAAAElFTkSuQmCC"""
def get_window():
    try:
        window = getWindowsWithTitle('TelegramDesktop')[-1]
        return {"left": window.left, "top": window.top, "width": window.width, "height": window.height}
    except IndexError:
        print("Run Blum webapp")
        exit(0)  
def base64_to_image():
    image_data = b64decode(button_base64)
    image = open(BytesIO(image_data))
    return cvtColor(array(image), COLOR_BGR2GRAY)
def find_patt(image, patt):
    img_grey = cvtColor(image, COLOR_BGR2GRAY)
    res = matchTemplate(img_grey, patt, TM_CCOEFF_NORMED)
    loc = where(res > 0.6)
    return zip(*loc[::-1])
def find_color(color, image):
    mapping = (color[2], color[1], color[0], 255)
    indexes = where(all(image == mapping, axis=-1))
    return transpose(indexes)
def run(color, mon, button):
    with mss() as sct:
        while True:
            img_arr = array(sct.grab(mon))
            result = find_color(color, img_arr)
            if len(result):
                click(result[0][1] + mon.get('left'), result[0][0] + mon.get('top'))
            else:
                if button is not None:
                    points = list(find_patt(img_arr, button))
                    if points:
                        click(points[0][0] + mon.get("left") + 60, points[0][1] + mon.get("top") + 30)
            if is_pressed("q"):
                break         
if __name__ == '__main__':
    monitor = get_window()
    threads = (Thread(target=run, args=((205, 220, 0), monitor, base64_to_image())), Thread(target=run, args=((230, 255, 145), monitor, None)))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    print('Script has been stop')