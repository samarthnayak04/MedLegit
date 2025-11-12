"""create legal_cases

Revision ID: 58370db2824a
Revises: d564a744cd41
Create Date: 2025-11-11 22:50:03.903848

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '58370db2824a'
down_revision: Union[str, None] = 'd564a744cd41'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "legal_cases",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("input_text", sa.Text(), nullable=False),
        sa.Column("legal_issues", pg.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("relevant_laws", pg.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("result_json", pg.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        # schema="public",  # add if you intentionally use a non-default schema
    )

def downgrade() -> None:
    op.drop_table("legal_cases")  # add schema="public" if you set it above