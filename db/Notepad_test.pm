package Notepad_test;

=head1 NAME

  Notepad_test - module for Tree configuration

=head1 SYNOPSIS

  use Notepad_test;
  my $Sticker = Sticker->new($db, $admin, \%conf);

=cut

use strict;
use parent 'main';
use warnings;
my ($admin, $CONF);


#*******************************************************************
#  Инициализация обьекта
#*******************************************************************
sub new {
  my $class = shift;
  my $db    = shift;
  ($admin, $CONF) = @_;

  my $self = {};
  bless($self, $class);

  $self->{db} = $db;
  $self->{admin} = $admin;
  $self->{conf} = $CONF;

  return $self;
}

#**********************************************************

=head2 function get_sticker() - get type list

  Arguments:
    $attr
  Returns:
    @list

  Examples:
    my $list = $Tree->type_list({COLS_NAME=>1});

=cut

#**********************************************************
sub get_sticker {
  my $self = shift;
  my ($attr) = @_;

  $self->query2(
    "SELECT id,subject,text FROM notepad",
    undef, $attr
  );

  return $self->{list};
}
1;