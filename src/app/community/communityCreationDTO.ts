import { Community } from "./community";
import { Member } from "../member/member";

export interface CommunityCreationDTO {
    memberDTO : Member;
    communityDTO : Community;
}