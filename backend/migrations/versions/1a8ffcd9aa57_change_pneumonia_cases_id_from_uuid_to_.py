"""change pneumonia_cases.id from UUID to Integer

Revision ID: 1a8ffcd9aa57
Revises: 35ea4a962445
Create Date: 2025-10-01 19:54:50.312783
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "1a8ffcd9aa57"
down_revision: Union[str, None] = "35ea4a962445"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop the old table if it exists (UUID id)
    
    # Recreate with Integer primary key
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
