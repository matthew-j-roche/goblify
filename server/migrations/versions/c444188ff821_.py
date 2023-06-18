"""empty message

Revision ID: c444188ff821
Revises: d2e87e094cd9
Create Date: 2023-06-17 22:51:24.655467

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c444188ff821'
down_revision = 'd2e87e094cd9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('blocks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=255), nullable=True))

    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=255), nullable=True))

    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.drop_column('name')

    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.drop_column('name')

    with op.batch_alter_table('blocks', schema=None) as batch_op:
        batch_op.drop_column('name')

    # ### end Alembic commands ###