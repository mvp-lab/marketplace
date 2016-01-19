class AddWechatIdToPeople < ActiveRecord::Migration
  def self.up
    add_column :people, :wechat_id, :string
    
    add_index :people, :wechat_id, :unique => true
  end

  def self.down
    remove_index :people, :wechat_id
    
    remove_column :people, :wechat_id
  end
end
