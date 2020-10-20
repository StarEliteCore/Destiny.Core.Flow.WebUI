import * as PageQuery from "@/shared/request";

import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from "@/shared/request/query.enum";

import DeleteMixins from "@/shared/mixins/delete-dialog.mixins";
import { EOperate } from '@/shared/eoperate';
import { ITableColumn } from '@/shared/table/ITable';
import { IUserTableDto } from '@/domain/entity/userdto/userDto';
import { MainManager } from "@/domain/services/main/main-manager";
import PageMixins from "@/shared/mixins/page.mixins";
import UserOperate from "@/views/system/user-managerment/user-operate/user-operate.vue"
import UserOperateInfo from "@/views/system/user-managerment/user-operate/user-operate"

@Component({
  name: "UserManagerment",
  components:{
    UserOperate
  }
})
export default class UserManagerment extends Mixins(PageMixins, DeleteMixins) {
  private queryfileter: PageQuery.IPageRequest = new PageQuery.PageRequest();
  private columns: ITableColumn[] = [
    {
      type: "index",
      title: "序号",
      width: 70,
      align: "center",
      maxWidth:30,
    },
    {
      title: "用户名",
      key: "userName",
      align: "center",
      maxWidth:150
    },
    {
      title: "用户昵称",
      key: "nickName",
      align: "center",
    },
    {
      title: "创建时间",
      key: "createdTime",
      align: "center",
    },
    {
      title: "是否系统用户",
      key: "isSystem",
      align: "center",
    },
    {
      title: "性别",
      key: "sex",
      align: "center",
    },
    {
      title: "最后修改时间",
      key: "lastModifionTime",
      align: "center",
    },
    {
      title: "是否删除",
      key: "isOutputDto",
      align: "center",
    },
    {
      title: "描述",
      key: "description",
      align: "center",
    }
  ];
  private userTable:Array<IUserTableDto>=[];

  /**
   * 页面加载方法
   */
  private created() {
    this.getTableData();
  }
  @Ref("UserOperateInfo")
  private UserOperateInfo!: UserOperateInfo;
  /**
   * 
   * @param _type 操作方法
   * @param _rowId 
   */
  private operateItem(_type: EOperate, _rowId?: string) {
    this.UserOperateInfo.Show(_type,(res: boolean) => {
      console.log(2222222222222222222222)
    },_rowId)
  }
  private async getTableData() {
    await MainManager.Instance().UserService.getUserPage(
      this.queryfileter
    ).then(res=>{
      if (res.success) {
        this.userTable=res.itemList;
        console.log(this.userTable)
      }
    });
    
  }

  /**
   * @description 根据id删除
   */
  private async deleteItemById(_id: string) {
    console.log("15212a1d");
  }
}
