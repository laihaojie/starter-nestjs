interface JwtPayloadModel {
  id: string;
  role: number;
}

interface RoleTypeModel {
  admin: number[];
  user: number[];
  super: number[];
}