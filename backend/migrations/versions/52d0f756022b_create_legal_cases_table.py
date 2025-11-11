from alembic import op
import sqlalchemy as sa

revision = "52d0f756022b"
down_revision = "1ef1a5f0bbd0"  # current DB head
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        "legal_cases",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("legal_issues", sa.JSON, nullable=False),
        sa.Column("relevant_laws", sa.JSON, nullable=False),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    )

def downgrade() -> None:
    op.drop_table("legal_cases")
