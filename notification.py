import winsound, sys
from plyer import notification

if len(sys.argv) == 3:  # Expecting the script name and two arguments
    arg1 = sys.argv[1]
    arg2 = sys.argv[2]

def show_notification(title='Chat Event!', message='chat event spawned!', icon_path="C:/Users/EpicPichu/Desktop/SSSniperPika69420/assets/pika.ico"):
    notification.notify(
        title=title,
        message=message,
        app_icon=icon_path,
        timeout=4
    )
    winsound.PlaySound('C:/Users/EpicPichu/Desktop/SSSniperPika69420/assets/lights_on.wav', 0)


icon_path = "assets/pika.ico"

show_notification()


# ily_pichu >//< #