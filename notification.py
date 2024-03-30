import winsound, sys, os
from plyer import notification

dir = os.path.dirname(os.path.abspath(__file__))

icon_path = dir+"/assets/pika.ico"
soundpath = dir+"/assets/lights_on.wav"

if len(sys.argv) == 3:
    arg1 = sys.argv[1]
    arg2 = sys.argv[2]

def notif(title='Chat Event!', message='chat event spawned!', icon=icon_path):
  notification.notify(
    title=title,
    message=message,
    app_icon=icon,
    timeout=4
  )
  winsound.PlaySound(soundpath, 0)


if len(sys.argv) == 1: notif()
elif len(sys.argv) == 3: notif(arg1, arg2)
else: pass




# ily_pichu >//< #