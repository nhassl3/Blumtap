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
button_base64 = "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"
def get_window():
    try:
        window = getWindowsWithTitle('TelegramDesktop')[-1]
        return {"left": window.left, "top": window.top, "width": window.width, "height": window.height}
    except IndexError:
        print("Run Blum webapp!")
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
    threads = (Thread(target=run, args=((255, 2, 200), monitor, base64_to_image())), Thread(target=run, args=((15, 15, 15), monitor, None)), Thread(target=run, args=((105, 95, 80), monitor, None)))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    print('Stop')