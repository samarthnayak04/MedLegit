from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '1a8ffcd9aa57'
down_revision: Union[str, None] = '35ea4a962445'  # this should match the previous migration ID
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. DROP THE EXISTING TABLE (THIS WILL LOSE ALL DATA!)
    #    This is necessary because you are changing the ID type and autoincrement behavior.
    op.drop_table("pneumonia_cases")
    
    # 2. Recreate with Integer primary key
    op.create_table(
        "pneumonia_cases",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("prediction", sa.String(50), nullable=False),
        sa.Column("confidence", sa.Float, nullable=False),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
        ),
    )


def downgrade() -> None:
    # Drop int version
    op.drop_table("pneumonia_cases")

    # Recreate with UUID primary key
    from sqlalchemy.dialects import postgresql

    op.create_table(
        "pneumonia_cases",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("prediction", sa.String(50), nullable=False),
        sa.Column("confidence", sa.Float, nullable=False),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
        ),
    )