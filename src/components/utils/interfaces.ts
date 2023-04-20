export interface tableConfig_prop{
    label :string ,
    prop :string ,
    conditionType: string, // 条件类型
    fuzzyQuery?:boolean
    conditionListName?: string
  }
export interface condition extends tableConfig_prop{
    value:{
        value1: String|number,
        value2: String|number,
    }
  }
export interface customParams{
    
}
