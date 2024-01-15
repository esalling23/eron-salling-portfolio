import socketio
import json
from utils import config
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Message, Room
from .serializers import MessageSerializer
from asgiref.sync import sync_to_async

mgr = socketio.AsyncRedisManager(config.REDIS_URL)
sio  = socketio.AsyncServer(
  async_mode="asgi",
  client_manager=mgr,
  cors_allowed_origins="*"
)

# establish client connection
@sio.on("connect")
async def connect(sid, env, auth):
  if auth:
    room_id = auth["room_id"]
    print("SocketIO connect")
    sio.enter_room(sid, room_id)
    await sio.emit("connect", f"Connected as {sid}")
  else:
    raise ConnectionRefusedError("No auth")

# connection with orm
def store_and_return_message(data):
  data = json.loads(data)

  sender_id = data["sender_id"]
  room_id = data["room_id"]
  text = data["text"]

  sender = get_object_or_404(User, pk=sender_id)
  room = get_object_or_404(Room, short_id=room_id)

  instance = Message.objects.create(
    sender=sender,
    room=room,
    text = text
  )
  instance.save()

  message = MessageSerialize(instance).data
  message["room"] = room
  message["sender"] = str(message["sender"])

  return message

# listening to a 'message' event from the client
@sio.on("message")
async def print_message(sid, data):
    print("Socket ID", sid)
    message = await sync_to_async(store_and_return_message, thread_sensitive=True)(
        data
    )  # communicating with orm
    await sio.emit("new_message", message, room=message["chat"])


@sio.on("disconnect")
async def disconnect(sid):
    print("SocketIO disconnect")