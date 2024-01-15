# establishes a connection with the client
@sio.on("connect")
async def connect(sid, env):
    chat_id = "7ce6aa6a-208a-4c1e-8f96-ebeb8eb16996"
    print("SocketIO connect")
    sio.enter_room(sid, chat_id)
    await sio.emit("connect", f"Connected as {sid}")