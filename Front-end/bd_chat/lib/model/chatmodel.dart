class ChatModel {
  String name;
  String icon;
  bool isGroup;
  String time;
  String currentMessage;
  String des;
  bool select = false;

  ChatModel(
      {required this.name,
      required this.icon,
      required this.isGroup,
      required this.time,
      required this.currentMessage,
      required this.des,
      required this.select
      });
}
