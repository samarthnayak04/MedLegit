import sys
import os
import pathlib
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# --- Fix the syntax error by separating the imports ---
import app.models # Package import
from app.core.db import Base # Class import
# ------------------------------------------------------

# --- Import ALL remaining models (must be before target_metadata) ---
from app.models import user 
from app.models.fraud import FraudCase 
from app.models.health import PneumoniaCase 
from app.models.legal import LegalCase

# --- Path setup ---
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
BASE_DIR = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

# --- Alembic Config ---
config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# --- Metadata Assignment ---
# This must be at the end of all model imports
target_metadata = Base.metadata
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
