sudo pkill -f gunicorn;
/home/ubuntu/baymun/baymunenv/bin/gunicorn --workers 3 --bind 0.0.0.0:8080 backend.wsgi:application &
