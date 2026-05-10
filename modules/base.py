"""AxiomModule 基类 — 定义模块可提供的所有扩展点，全部可选。"""

from flask import Blueprint


class AxiomModule:
    name: str = ""
    label: str = ""
    description: str = ""

    def get_blueprint(self) -> Blueprint | None:
        """返回 Flask Blueprint，路由在 /m/<name>/ 下。"""
        return None

    def get_db_tables(self) -> dict[str, str]:
        """返回 {表名: CREATE_TABLE_SQL}，启动时自动建表。"""
        return {}

    def get_automation_jobs(self) -> dict:
        """返回追加到 core AUTOMATION_JOBS 的任务定义。"""
        return {}

    def get_nav_item(self) -> dict | None:
        """返回 {id, label} 用于前端导航，None 表示不在导航中显示。"""
        return {"id": f"module-panel-{self.name}", "label": self.label}

    def get_frontend_metadata(self) -> dict:
        """返回前端所需元数据：scripts 列表、endpoints 等。"""
        return {
            "scripts": [f"/m/{self.name}/static/{self.name}.js"],
        }
