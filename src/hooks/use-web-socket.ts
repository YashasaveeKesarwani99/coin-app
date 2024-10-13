// custom hook for handling web socket functions externally

export const useWebSocket = <T>(url: string, onMessage: (data: T) => void) => {
  let socket: WebSocket | null = null;

  const connect = () => {
    socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      onMessage(parsedData);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
    }
  };

  return {
    connect,
    disconnect,
  };
};
