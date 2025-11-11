"""Remove unique index from user_id in legal_cases

Revision ID: ff6baace62ad
Revises: b2e513d57bc6
Create Date: 2025-10-29 23:33:54.690451

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import text

# revision identifiers, used by Alembic.
revision: str = 'ff6baace62ad'
down_revision: Union[str, None] = 'b2e513d57bc6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    conn = op.get_bind()
    # Safely drop the index if it exists
    conn.execute(text("DROP INDEX IF EXISTS ix_legal_cases_user_id"))
    print("✅ Dropped index ix_legal_cases_user_id (if it existed).")


def downgrade():
    # Optionally recreate it if needed during downgrade
    op.create_index(
        'ix_legal_cases_user_id',
        'legal_cases',
        ['user_id'],
        unique=True
    )
    print("🔁 Recreated unique index ix_legal_cases_user_id on downgrade.")