import winsound, sys
from plyer import notification
icon_path = "assets/pika.ico"

if len(sys.argv) == 3:
    arg1 = sys.argv[1]
    arg2 = sys.argv[2]

def notif(title='Chat Event!', message='chat event spawned!', icon_path="C:/Users/EpicPichu/Desktop/SSSniperPika69420/assets/pika.ico"):
  notification.notify(
    title=title,
    message=message,
    app_icon=icon_path,
    timeout=4
  )
  winsound.PlaySound('C:/Users/EpicPichu/Desktop/SSSniperPika69420/assets/lights_on.wav', 0)


if len(sys.argv) == 1: notif()
elif len(sys.argv) == 3: notif(arg1, arg2)
else: pass




# ily_pichu >//< #