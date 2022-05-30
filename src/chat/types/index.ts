interface MessageToGroupInput {
  groupId: string;
  message: string;
}

interface CreateGroupInput {
  title: string;
}

interface JoinGroupInput {
  groupId: string;
}

interface LeaveFromGroupInput {
  groupId: string;
}

export type {
  MessageToGroupInput,
  CreateGroupInput,
  JoinGroupInput,
  LeaveFromGroupInput,
};
