import { Group } from "../entities/group.entity";
import { GroupMessage } from "../../message/types";

interface UserIncludeGroup {
    id: string
    title: string
}

interface UserGroups {
    ownGroups: Group[],
    joinedGroups: UserIncludeGroup[]
}

interface GroupMessages {
    id: string
    title: string
    messages: GroupMessage[]
}

interface SearchGroup {
    id: string
    title: string
}

export { UserGroups, UserIncludeGroup, GroupMessages, SearchGroup };
