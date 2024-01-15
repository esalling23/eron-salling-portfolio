from django.db import models
from django.auth import get_user_model
import uuid

# Create your models here.
class Message:
  content = models.TextField()
  sender = models.ForeignKey(get_user_model(), on_delete=models.DO_NOTHING)
  room = models.ForeignKey(ChatRoom, on_delete=models.DO_NOTHING, related_name="messages")
  short_id = models.CharField(max_length=255, default=uuid.uuid4, unique=True)
  timestamp = models.DateTime(auto_now_add=True)

  def __str__(self):
    return f"{user_from}: {content}"

class Room:
  name = models.CharField(max_length=30)
