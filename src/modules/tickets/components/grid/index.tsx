import { Avatar, Card, List, Tooltip } from 'antd';
import { BadgeCheck, Briefcase, Edit, Eye, Mail, MapPin, ShieldAlert, ShieldCheck, Trash2 } from 'lucide-react';

function GridView({tableData, isLoading, pagination, handleView, handleEdit, handleDelete, default_doctor}: any) {
  return (
    
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
          dataSource={tableData}
          loading={isLoading}
          pagination={pagination}
          renderItem={(item: any) => (
            <List.Item>
              <Card
                className="rounded-xl overflow-hidden border-gray-100 shadow-sm"
                bodyStyle={{ padding: "20px" }}
                actions={[
                  <Tooltip title="View">
                    <Eye
                      size={18}
                      className="mx-auto text-blue-500"
                      onClick={() => handleView(item)}
                    />
                  </Tooltip>,
                  <Tooltip title="Edit">
                    <Edit
                      size={18}
                      className="mx-auto text-green-500"
                      onClick={() => handleEdit(item)}
                    />
                  </Tooltip>,
                  <Tooltip title="Delete">
                    <Trash2
                      size={18}
                      className="mx-auto text-red-500"
                      onClick={() => handleDelete(item)}
                    />
                  </Tooltip>,
                ]}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-3">
                    <Avatar
                      size={70}
                      src={item.profile_photo || default_doctor}
                      className="border-2 border-white shadow-sm"
                    />
                    <div className="absolute bottom-1 -right-1 bg-white rounded-full p-0.5">
                      {item.is_active ? (
                        <ShieldCheck
                          size={18}
                          className="text-green-500 bg-white rounded-full"
                        />
                      ) : (
                        <ShieldAlert
                          size={18}
                          className="text-red-500 bg-white rounded-full"
                        />
                      )}
                    </div>
                  </div>
    
                  <div className="text-center mb-4">
                    <h4 className="m-0 font-bold text-gray-800 flex items-center justify-center gap-1 text-base">
                      {item.name}{" "}
                      {item.is_verify === 1 && (
                        <BadgeCheck size={16} className="text-blue-500" />
                      )}
                    </h4>
                    <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
                      {item.specialization}
                    </span>
                  </div>
    
                  <div className="w-full space-y-2 text-xs text-gray-500 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />{" "}
                      <span className="truncate">{item.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} />{" "}
                      <span>{item.experience} yrs Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />{" "}
                      <span className="truncate">{item.address || "-"}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      );
  
}

export default GridView