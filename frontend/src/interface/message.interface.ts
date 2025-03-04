export interface IMessage {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string; // Hoặc Date nếu bạn muốn xử lý thời gian dưới dạng đối tượng Date
    updatedAt: string; // Tương tự như trên
    __v: number;
}

export interface IMessageShake extends IMessage {
    shouldShake: boolean;
}
