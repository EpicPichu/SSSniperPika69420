import winsound, sys
from plyer import notification

if len(sys.argv) == 3:  # Expecting the script name and two arguments
    arg1 = sys.argv[1]
    arg2 = sys.argv[2]

def show_notification(title, message, icon_path):
    notification.notify(
        title=title,
        message=message,
        app_icon=icon_path,
        timeout=4
    )
    winsound.PlaySound('assets/lights_on.wav', 0)


icon_path = "assets/pika.ico"

show_notification(arg1, arg2, icon_path)


# ily_pichu >//< #