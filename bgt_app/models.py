import uuid
import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver
from autoslug import AutoSlugField
from django.urls import reverse
from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
    validate_image_file_extension,
)
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User


class UserProfile(models.Model):
    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}'s profile"


@receiver(post_save, sender=User)
def update_profile_signal(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.userprofile.save()


class ToolSession(models.Model):
    class Meta:
        verbose_name = "Tool Session"
        verbose_name_plural = "Tool Sessions"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = AutoSlugField(populate_from='session_name', unique=True)
    session_name = models.CharField(max_length=50)
    creation_date = models.DateField(auto_now_add=True)
    session_owner = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        null=True
    )

    def get_absolute_url(self):
        return reverse("tool_session_detail", kwargs={"slug": self.slug})

    def __str__(self):
        return f"{self.session_name}"


class Player(models.Model):
    class Meta:
        verbose_name = "Player"
        verbose_name_plural = "Players"

    player_color_choices = [
        ('black', 'black'),
        ('white', 'white'),
        ('green', 'green'),
        ('blue', 'blue'),
        ('yellow', 'yellow'),
        ('purple', 'purple'),
        ('orange', 'orange'),
        ('red', 'red'),
        ('brown', 'brown'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=40)
    color = models.CharField(max_length=10,
                             choices=player_color_choices,
                             default='black'
                             )
    player_order = models.SmallIntegerField(default=0)
    tool_session = models.ForeignKey(ToolSession,
                                     related_name='players',
                                     on_delete=models.CASCADE,
                                     null=True
                                     )
    score = models.FloatField(
        default=0,
        validators=[
            MinValueValidator(limit_value=-1000),
            MaxValueValidator(limit_value=1000)],
    )

    def __str__(self):
        return f'player-{self.name}'


class HpTracker(models.Model):
    class Meta:
        verbose_name = "HP Tracker"
        verbose_name_plural = "HP Trackers"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    hp_value = models.SmallIntegerField(
        validators=[MinValueValidator(limit_value=-1000),
                    MaxValueValidator(limit_value=1000)],
        default=0,
    )
    tool_session = models.ForeignKey(ToolSession,
                                     related_name='hp_tracker',
                                     on_delete=models.CASCADE,
                                     null=True
                                     )

    def __str__(self):
        return f"Title: {self.title} HP: {self.hp_value}"


class DieGroup(models.Model):
    class Meta:
        verbose_name = "Dice Group"
        verbose_name_plural = "Die Groups"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    tool_session = models.ForeignKey(
        ToolSession,
        related_name='die_group',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"{self.title}"


class DieStandard(models.Model):
    class Meta:
        verbose_name = "Standard Die"
        verbose_name_plural = "Standard Dice"
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    num_sides = models.SmallIntegerField(
        default=6,
        validators=[MinValueValidator(limit_value=2),
                    MaxValueValidator(limit_value=100)],
    )
    rolled_value = models.SmallIntegerField(default=0)
    group = models.ForeignKey(
        DieGroup,
        related_name='standard_dice',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"D:{self.num_sides}"


class ResourceGroup(models.Model):
    class Meta:
        verbose_name = "Resource Group"
        verbose_name_plural = "Resource Groups"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    tool_session = models.ForeignKey(
        ToolSession,
        related_name='resource_groups',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"{self.title}"


class Resource(models.Model):
    class Meta:
        verbose_name = "Resource"
        verbose_name_plural = "Resources"
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=40)
    quantity = models.SmallIntegerField(default=0)
    production_available = models.BooleanField(default=False)
    production_modifier = models.SmallIntegerField(default=0)
    group = models.ForeignKey(
        ResourceGroup,
        related_name='resources',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f'Resource: {self.name}'


class GameTimer(models.Model):
    class Meta:
        verbose_name = "Game Timer"
        verbose_name_plural = "Game Timers"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    saved_duration = models.DurationField(default=datetime.timedelta)
    tool_session = models.ForeignKey(
        ToolSession,
        related_name='game_timers',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f'{self.title} - {self.saved_duration}'


class ScoringGroup(models.Model):
    class Meta:
        verbose_name = "Scoring Group"
        verbose_name_plural = "Scoring Groups"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    tool_session = models.ForeignKey(
        ToolSession,
        related_name='scoring_groups',
        on_delete=models.CASCADE,
        null=True
    )
    players = models.ManyToManyField(
        Player,
        related_name='scoring_groups',
        blank=True,
        default=None,
    )

    def __str__(self):
        return f"{self.title}"


class ScoringCategory(models.Model):
    class Meta:
        verbose_name = "Scoring Category"
        verbose_name_plural = "Scoring Categories"

    rounding_choices = [
        ('up', 'round up'),
        ('down', 'round down'),
        ('none', 'no rounding'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=40)
    points_gained_or_lost = models.SmallIntegerField(
        default=0,
        validators=[
            MinValueValidator(limit_value=-1000),
            MaxValueValidator(limit_value=1000)
        ],
    )
    items_per_group = models.SmallIntegerField(
        default=0,
        validators=[
            MinValueValidator(limit_value=-1000),
            MaxValueValidator(limit_value=1000)
        ],
    )
    rounding = models.CharField(
        max_length=5, choices=rounding_choices, default='none'
    )
    group = models.ForeignKey(
        ScoringGroup,
        related_name='scoring_categories',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f'{self.name}'


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'userid_{0}_{1}/{2}'.format(
        instance.group.tool_session.session_owner.user.id,
        instance.group.tool_session.session_owner.user.username,
        filename
    )


class DrawBag(models.Model):
    class Meta:
        verbose_name = "Draw Bag"
        verbose_name_plural = "Draw Bags"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    tool_session = models.ForeignKey(
        ToolSession,
        related_name='draw_bag',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"{self.title}"


def validate_image_file_size(image):
    file_size = image.file.size
    size_limit = 1048576  # 1 MB
    if file_size > size_limit:
        raise ValidationError("Maximum file size is 1 MB.")


class DrawBagItem(models.Model):
    class Meta:
        verbose_name = "Draw Bag Item"
        verbose_name_plural = "Draw Bag Items"
        ordering = ["-drawn_datetime"]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=40)
    drawn = models.BooleanField(default=False)
    drawn_datetime = models.DateTimeField(null=True, blank=True)
    image = models.ImageField(upload_to=user_directory_path,
                              validators=[validate_image_file_extension,
                                          validate_image_file_size],
                              height_field=None,
                              width_field=None,
                              null=True,
                              blank=True)
    group = models.ForeignKey(
        DrawBag,
        related_name='draw_bag_items',
        on_delete=models.CASCADE,
        null=True
    )

    def save(self, *args, **kwargs):
        # update the drawn_datetime when drawn is set to True
        # delete the drawn_datetime when drawn is set to False
        if self.drawn and self.drawn_datetime is None:
            self.drawn_datetime = datetime.datetime.now()
        elif not self.drawn and self.drawn_datetime is not None:
            self.drawn_datetime = None
        super(DrawBagItem, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"